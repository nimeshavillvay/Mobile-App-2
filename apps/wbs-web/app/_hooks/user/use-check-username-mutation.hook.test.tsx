import { createWrapper } from "@/_lib/test-utils";
import { act, renderHook, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/server";
import useCheckUsernameMutation from "./use-check-username-mutation.hook";

describe("useCheckUsernameMutation", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());
  it("should execute useCheckUsernameMutation and return expected username check when successful", async () => {
    const { result } = renderHook(() => useCheckUsernameMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutateAsync("testuser");
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      statusCode: "OK",
    });
  });

  it("should execute useCheckUsernameMutation and return error", async () => {
    const { result } = renderHook(() => useCheckUsernameMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      //using "testuserexisting" as an existing username, the handler defines an error
      result.current.mutate("testuserexisting");
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
