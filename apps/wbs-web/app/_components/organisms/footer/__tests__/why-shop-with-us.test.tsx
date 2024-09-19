import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import React from "react";
import WhyShopWithUs from "../why-shop-with-us";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const MockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} />
);

const mockReasons = [
  {
    title: "Reason 1",
    description: "Description 1",
    Icon: MockIcon,
  },
  {
    title: "Reason 2",
    description: "Description 2",
    Icon: MockIcon,
  },
] as const;

describe("WhyShopWithUs", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });
  it("renders with default title when no title is provided", () => {
    render(<WhyShopWithUs reasons={mockReasons} />);
    expect(screen.getByText("Why Shop With Us?")).toBeInTheDocument();
  });

  it("renders with custom title when provided", () => {
    const customTitle = "Custom Title";
    render(<WhyShopWithUs title={customTitle} reasons={mockReasons} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    const description = "Test description";
    render(<WhyShopWithUs reasons={mockReasons} description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders correct number of reasons", () => {
    render(<WhyShopWithUs reasons={mockReasons} />);
    expect(screen.getAllByTestId(/reason-/)).toHaveLength(mockReasons.length);
  });

  it("renders reason titles and descriptions", () => {
    render(<WhyShopWithUs reasons={mockReasons} />);
    mockReasons.forEach((reason) => {
      expect(screen.getByText(reason.title)).toBeInTheDocument();
      expect(screen.getByText(reason.description)).toBeInTheDocument();
    });
  });

  it("doesn't render on non-matching paths", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    render(<WhyShopWithUs reasons={mockReasons} />);
    expect(screen.queryByTestId("whyshopwithus")).not.toBeInTheDocument();
  });

  it("renders on matching paths", () => {
    (usePathname as jest.Mock).mockReturnValue("/category/some-category");
    render(<WhyShopWithUs reasons={mockReasons} />);
    expect(screen.getByTestId("whyshopwithus")).toBeInTheDocument();
  });
});
