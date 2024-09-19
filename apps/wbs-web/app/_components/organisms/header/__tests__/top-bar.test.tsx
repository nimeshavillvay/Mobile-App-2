import { toCamelCase } from "@/_lib/utils";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import TopBar from "../top-bar";

// Mock the toCamelCase function
jest.mock("@/_lib/utils", () => ({
  toCamelCase: jest.fn(),
}));

describe("TopBar", () => {
  const props = {
    email: "test@example.com",
    phoneNumber: "1234567890",
    companyName: "Test Company",
  };

  it("renders company name with correct data-testid", () => {
    render(<TopBar {...props} />);
    const companyNameLink = screen.getByTestId(
      `link-${toCamelCase(props.companyName)}`,
    );
    expect(companyNameLink).toBeInTheDocument();
    expect(companyNameLink).toHaveAttribute("href", "/");
    expect(companyNameLink).toHaveClass("hidden md:block");
    expect(companyNameLink).toHaveTextContent(props.companyName);
  });

  it("renders phone number button with correct data-testid", () => {
    render(<TopBar {...props} />);
    const phoneButton = screen.getByTestId("button-phoneNumber");
    expect(phoneButton).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: props.phoneNumber }),
    ).toHaveAttribute("href", `tel:+${props.phoneNumber}`);
  });

  it("renders email button with correct data-testid", () => {
    render(<TopBar {...props} />);
    const emailButton = screen.getByTestId("button-email");
    expect(emailButton).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Need help?" })).toHaveAttribute(
      "href",
      `mailto:${props.email}`,
    );
  });

  it("renders icons with correct data-testid", () => {
    render(<TopBar {...props} />);
    expect(screen.getByTestId("icon-email")).toBeInTheDocument();
    expect(screen.getByTestId("icon-phone")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Text")).toBeInTheDocument();
  });

  it("calls toCamelCase function with company name", () => {
    render(<TopBar {...props} />);
    expect(toCamelCase).toHaveBeenCalledWith(props.companyName);
  });

  it("formats phone number correctly", () => {
    render(<TopBar {...props} />);
    expect(screen.getByText(props.phoneNumber)).toBeInTheDocument();
  });
});
