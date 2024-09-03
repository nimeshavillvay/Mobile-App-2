import useRegisterExistingUserMutation from "@/(auth)/register/_components/register-existing-user/use-register-existing-user-mutation.hook";
import { revalidateSiteLayout } from "@/_actions/revalidate";
import { createWrapper } from "@/_lib/test-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { server } from "../../../../../../mocks/server";

jest.mock("@/_actions/revalidate", () => ({
  revalidateSiteLayout: jest.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

const mockData = {
  accountNo: "123456",
  documentId: "DOC123",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  userName: "johndoe",
  password: "password123",
  phoneNumber: "1234567890",
};

describe("useRegisterExistingUserMutation", () => {
  it("should return the initial values for data, error and loading", async () => {
    const { result } = renderHook(() => useRegisterExistingUserMutation(), {
      wrapper: createWrapper(),
    });
    const { data, error } = result.current;

    expect(data).toBe(undefined);
    expect(error).toBe(null);
  });

  it("should execute useRegisterExistingUserMutation and return expected data when successful", async () => {
    const { result } = renderHook(() => useRegisterExistingUserMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(mockData);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      statusCode: "OK",
      type: "USER",
      id: 123,
    });
  });

  it("should execute useRegisterExistingUserMutation and return error", async () => {
    const { result } = renderHook(() => useRegisterExistingUserMutation(), {
      wrapper: createWrapper(),
    });

    const invalidMockData = {
      ...mockData,
      accountNo: "11111",
      documentId: "11111",
    };

    await act(async () => {
      result.current.mutate(invalidMockData);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  it("should invalidate queries on successful registration", async () => {
    const queryClient = new QueryClient();
    queryClient.invalidateQueries = jest.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useRegisterExistingUserMutation(), {
      wrapper,
    });

    await act(async () => {
      result.current.mutate(mockData);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(queryClient.invalidateQueries).toHaveBeenCalled();
  });

  it("should call revalidateSiteLayout on successful registration", async () => {
    const { result } = renderHook(() => useRegisterExistingUserMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(mockData);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(revalidateSiteLayout).toHaveBeenCalledWith("/register/success");
  });
});
