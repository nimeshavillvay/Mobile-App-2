import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

describe("Accordion Component", () => {
  const renderAccordion = () => {
    return render(
      <Accordion type="single" collapsible className="w-[32rem] max-w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
  };

  it("should render Accordion with correct structure", () => {
    renderAccordion();
    expect(screen.getByText("Is it accessible?")).toBeInTheDocument();
    expect(screen.getByText("Is it styled?")).toBeInTheDocument();
    expect(screen.getByText("Is it animated?")).toBeInTheDocument();
  });

  it("should render all AccordionTriggers with correct text", () => {
    renderAccordion();
    const triggers = screen.getAllByRole("button");
    expect(triggers).toHaveLength(3);
    expect(triggers[0]).toHaveTextContent("Is it accessible?");
    expect(triggers[1]).toHaveTextContent("Is it styled?");
    expect(triggers[2]).toHaveTextContent("Is it animated?");
  });

  it("should render all AccordionContents with correct text", () => {
    renderAccordion();
    fireEvent.click(screen.getByText("Is it accessible?"));
    expect(
      screen.getByText("Yes. It adheres to the WAI-ARIA design pattern."),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Is it styled?"));
    expect(
      screen.getByText(/Yes. It comes with default styles/),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Is it animated?"));
    expect(
      screen.getByText(/Yes. It's animated by default/),
    ).toBeInTheDocument();
  });
});
