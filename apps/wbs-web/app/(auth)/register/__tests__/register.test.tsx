import { renderWithClient } from "@/_lib/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import Register from "../register";

jest.mock("@/_context/recaptcha-ref", () => ({
  RecaptchaRefProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useCheckRecaptcha: jest.fn().mockReturnValue(() => Promise.resolve()),
}));

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Register Component", () => {
  const setup = () => {
    renderWithClient(<Register />);
  };

  beforeEach(() => {
    setup();
  });

  it("renders the main heading", () => {
    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });

  it("renders the first question for current user check with correct heading and buttons", () => {
    expect(
      screen.getByText("Are you a current Würth Baer Supply Company customer?"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("button-yes")).toBeInTheDocument();
    expect(screen.getByTestId("button-no")).toBeInTheDocument();
  });

  it("renders CurrentUserFlow when Yes is selected", () => {
    fireEvent.click(screen.getByTestId("button-yes"));
    expect(screen.getByTestId("existing-user")).toBeDefined();
  });

  it("renders AuthenticationToggle when newUserType is undefined", () => {
    expect(screen.getByTestId("auth-toggle")).toBeInTheDocument();
  });

  it("renders second question when No is selected with correct heading and buttons", () => {
    fireEvent.click(screen.getByTestId("button-no"));
    expect(
      screen.getByText("Please select your account type"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("button-buyingForBusiness")).toBeInTheDocument();
    expect(screen.getByTestId("button-homeowner")).toBeInTheDocument();
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
      screen.queryByText("Please select your account type"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("register-existing-user"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("register-new-user-flow"),
    ).not.toBeInTheDocument();
  });
});
