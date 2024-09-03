import AuthenticationToggle from "@/_components/molecules/auth/auth-toggle";
import { render, screen } from "@testing-library/react";

describe("AuthenticationToggle", () => {
  it("renders correctly for register mode", () => {
    render(<AuthenticationToggle mode="register" />);

    expect(screen.getByText("Already have an online account")).toBeDefined();
    const link = screen.getByText("Sign In");
    expect(link).toHaveAttribute("href", "/sign-in");
  });

  it("renders correctly for sign-in mode", () => {
    render(<AuthenticationToggle mode="sign-in" />);

    expect(screen.getByText("Don't have an online account?")).toBeDefined();
    const link = screen.getByText("Create Account");
    expect(link).toHaveAttribute("href", "/register");
  });
});
