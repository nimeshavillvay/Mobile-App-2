import { renderWithClient } from "@/_lib/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/server";
import SignIn from "./sign-in";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("SignIn Component", () => {
  it("renders the sign-in form correctly", async () => {
    renderWithClient(<SignIn />);
    expect(screen.getByText("Account Sign in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("User ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByText("Forgot user ID?")).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });

  it("submits the form with user credentials", async () => {
    renderWithClient(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });
  });

  it("displays an error message on authentication failure", async () => {
    renderWithClient(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testwrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "You have failed to login. This could be due to an incorrect Email or Password.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("shows generic error message for server error", async () => {
    renderWithClient(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: { value: "unknownuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "unknownpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(
        screen.getByText("Sign in unsuccessful. Please try again"),
      ).toBeInTheDocument();
    });
  });

  it("renders forgot user ID and password links", () => {
    renderWithClient(<SignIn />);
    expect(screen.getByText("Forgot user ID?")).toHaveAttribute(
      "href",
      "/forgot-user-id",
    );
    expect(screen.getByText("Forgot password?")).toHaveAttribute(
      "href",
      "/forgot-password",
    );
  });
});
