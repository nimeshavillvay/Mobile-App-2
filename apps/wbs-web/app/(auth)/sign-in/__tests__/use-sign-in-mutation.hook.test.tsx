import useSignInMutation from "@/(auth)/sign-in/use-sign-in-mutation.hook";
import { revalidateSiteLayout } from "@/_actions/revalidate";
import { createWrapper } from "@/_lib/test-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { server } from "../../../../mocks/server";

jest.mock("@/_actions/revalidate", () => ({
  revalidateSiteLayout: jest.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("useSignInMutation", () => {
  it("should return the initial values for data, error and loading", async () => {
    const { result } = renderHook(() => useSignInMutation(), {
      wrapper: createWrapper(),
    });
    const { data, error } = result.current;

    expect(data).toBe(undefined);
    expect(error).toBe(null);
  });

  it("should execute useSignInMutation and return expected user data when successful", async () => {
    const { result } = renderHook(() => useSignInMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ userName: "testuser", password: "testpass" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      statusCode: "200",
      userId: "123",
      authentication: {
        authorities: [
          {
            authority: "ROLE_USER",
          },
        ],
        name: "John Doe",
        changePassword: false,
        isSalesRep: true,
      },
    });
  });

  it("should execute useSignInMutation and return error", async () => {
    const { result } = renderHook(() => useSignInMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      //using "testwrong" as a wrong password, the handler defines an error
      result.current.mutate({ userName: "testuser", password: "testwrong" });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  it("should invalidate queries on successful sign-in", async () => {
    const queryClient = new QueryClient();
    queryClient.invalidateQueries = jest.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useSignInMutation(), { wrapper });

    await act(async () => {
      result.current.mutate({ userName: "testuser", password: "testpass" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(queryClient.invalidateQueries).toHaveBeenCalled();
  });

  it("should call revalidateSiteLayout on successful sign-in", async () => {
    const { result } = renderHook(() => useSignInMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ userName: "testuser", password: "testpass" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(revalidateSiteLayout).toHaveBeenCalledWith("/");
  });
});
