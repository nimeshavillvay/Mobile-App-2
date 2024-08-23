import { fireEvent, render, screen } from "@testing-library/react";
import Register from "./register";

describe("Register Component", () => {
  const setup = () => {
    render(<Register />);
  };

  beforeEach(() => {
    setup();
  });

  it("renders the main heading", () => {
    expect(screen.getByTestId("register-heading-title")).toHaveTextContent(
      "Create an account",
    );
  });

  it("renders the first question for current user check with correct heading and buttons", () => {
    expect(screen.getByTestId("register-heading")).toHaveTextContent(
      "Are you a current Würth Baer Supply Company customer?",
    );
    expect(screen.getByTestId("register-btn-yes")).toBeInTheDocument();
    expect(screen.getByTestId("register-btn-no")).toBeInTheDocument();
  });

  it("renders CurrentUserFlow when Yes is selected", () => {
    fireEvent.click(screen.getByTestId("register-btn-yes"));
    expect(screen.getByTestId("register-current-user-flow")).toBeDefined();
  });

  it("renders AuthenticationToggle when newUserType is undefined", () => {
    expect(screen.getByTestId("auth-toggle")).toBeInTheDocument();
  });

  it("renders second question when No is selected with correct heading and buttons", () => {
    fireEvent.click(screen.getByTestId("register-btn-no"));
    expect(screen.getByTestId("register-user-type-heading")).toHaveTextContent(
      "Please select your account type",
    );
    expect(
      screen.getByTestId("register-user-type-btn-buying-for-business"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("register-user-type-btn-homeowner"),
    ).toBeInTheDocument();
  });

  it("renders NewUserFlow when newUserType is selected", () => {
    fireEvent.click(screen.getByText("No"));
    fireEvent.click(screen.getByText("Homeowner"));
    expect(screen.getByTestId("register-new-user-flow")).toBeInTheDocument();
  });

  it("hides AuthenticationToggle when newUserType is defined", () => {
    fireEvent.click(screen.getByText("No"));
    fireEvent.click(screen.getByText("Homeowner"));
    expect(screen.queryByTestId("auth-toggle")).not.toBeInTheDocument();
  });

  it("does not render any user flow initially", () => {
    expect(
      screen.queryByTestId("register-user-type-heading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("register-current-user-flow"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("register-new-user-flow"),
    ).not.toBeInTheDocument();
  });
});
