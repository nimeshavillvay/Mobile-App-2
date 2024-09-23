import { renderWithClient } from "@/_lib/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Register from "../register";

jest.mock("@/_context/recaptcha-ref", () => ({
  RecaptchaRefProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useCheckRecaptcha: jest.fn().mockReturnValue(() => Promise.resolve()),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const createMockProps = () => ({
  passwordPolicies: {
    minimumLength: 8,
    minimumAlphabets: 1,
    minimumNumbers: 1,
  },
  industries: [{ code: "IND001", name: "Sample Industry" }],
  countries: [{ code: "US", country: "United States" }],
});

const setupMockRouter = () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  return mockRouter;
};

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Register Component", () => {
  const nonBusiness = createMockProps();
  const setup = () => {
    renderWithClient(<Register {...nonBusiness} />);
  };

  beforeEach(() => {
    setupMockRouter();
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
    expect(screen.getByText("Personal details")).toBeInTheDocument();
  });

  it("does not render any user flow initially", () => {
    expect(
      screen.queryByText("Please select your account type"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("register-existing-user"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Company and personal details"),
    ).not.toBeInTheDocument();
  });
});
