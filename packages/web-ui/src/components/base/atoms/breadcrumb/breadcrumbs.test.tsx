import { SlashIcon } from "@radix-ui/react-icons";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"; // TODO once implemented in molecules import from that
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

describe("Breadcrumb Component", () => {
  const renderBreadcrumb = () => {
    return render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon data-testid="svg-icon" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon data-testid="svg-icon" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon data-testid="svg-icon" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
  };

  it("Demo Breadcrumb story renders correctly", () => {
    renderBreadcrumb();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Breadcrumb")).toBeInTheDocument();
  });

  it("should render breadcrumb links with correct href attributes", () => {
    renderBreadcrumb();

    // Check if the href attributes are set correctly
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("Components")).toHaveAttribute(
      "href",
      "/docs/components",
    );
  });

  it("should render SlashIcon in BreadcrumbSeparator", () => {
    renderBreadcrumb();

    // Query all SVG elements in the document
    const svgIcons = screen.getAllByTestId("svg-icon"); // Ensure you have added data-testid="svg-icon" to your SVG elements

    // Ensure there are exactly 3 SVG elements for separators
    expect(svgIcons).toHaveLength(3);

    // Ensure each element is an SVG
    svgIcons.forEach((icon) => {
      expect(icon.tagName).toBe("svg");
    });
  });
});
