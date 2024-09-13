import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
  StepContext,
} from "@/_components/molecules/step-container/step-container";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

describe("StepContainer Components", () => {
  describe("StepContainer", () => {
    it("renders children and provides context", () => {
      const TestChild = () => {
        const context = React.useContext(StepContext);
        return <div>{context.title}</div>;
      };

      render(
        <StepContainer title="Test Title" state="open">
          <TestChild />
        </StepContainer>,
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });
  });

  describe("StepContainerOpen", () => {
    it("renders when state is open", () => {
      render(
        <StepContainer title="Open Step" state="open">
          <StepContainerOpen steps={{ current: 1, total: 3 }}>
            <div>Step Content</div>
          </StepContainerOpen>
        </StepContainer>,
      );

      expect(screen.getByText("Open Step")).toBeInTheDocument();
      expect(screen.getByText("Step Content")).toBeInTheDocument();
      expect(screen.getByText("1 of 3 steps")).toBeInTheDocument();
      expect(screen.getByText("Continue")).toBeInTheDocument();
    });

    it("does not render when state is closed", () => {
      render(
        <StepContainer title="Closed Step" state="closed">
          <StepContainerOpen steps={{ current: 1, total: 3 }}>
            <div>Step Content</div>
          </StepContainerOpen>
        </StepContainer>,
      );

      expect(screen.queryByText("Closed Step")).not.toBeInTheDocument();
      expect(screen.queryByText("Step Content")).not.toBeInTheDocument();
    });

    it("renders custom submit button text", () => {
      render(
        <StepContainer title="Custom Button" state="open">
          <StepContainerOpen
            steps={{ current: 1, total: 3 }}
            submitBtnText="Next"
          >
            <div>Step Content</div>
          </StepContainerOpen>
        </StepContainer>,
      );

      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    it("disables submit button when disableSubmit is true", () => {
      render(
        <StepContainer title="Disabled Submit" state="open">
          <StepContainerOpen
            steps={{ current: 1, total: 3 }}
            disableSubmit={true}
          >
            <div>Step Content</div>
          </StepContainerOpen>
        </StepContainer>,
      );

      expect(screen.getByText("Continue")).toBeDisabled();
    });

    it('shows "All fields are required" when allFieldsRequired is true', () => {
      render(
        <StepContainer title="All Fields Required" state="open">
          <StepContainerOpen
            steps={{ current: 1, total: 3 }}
            allFieldsRequired={true}
          >
            <div>Step Content</div>
          </StepContainerOpen>
        </StepContainer>,
      );

      expect(screen.getByText("*All fields are required")).toBeInTheDocument();
    });
  });

  describe("StepContainerClosed", () => {
    it("renders when state is closed", () => {
      render(
        <StepContainer title="Closed Step" state="closed">
          <StepContainerClosed>
            <div>Closed Content</div>
          </StepContainerClosed>
        </StepContainer>,
      );

      expect(screen.getByText("Closed Step")).toBeInTheDocument();
      expect(screen.getByText("Closed Content")).toBeInTheDocument();
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("does not render when state is open", () => {
      render(
        <StepContainer title="Open Step" state="open">
          <StepContainerClosed>
            <div>Closed Content</div>
          </StepContainerClosed>
        </StepContainer>,
      );

      expect(screen.queryByText("Open Step")).not.toBeInTheDocument();
      expect(screen.queryByText("Closed Content")).not.toBeInTheDocument();
    });

    it("calls onClick when Edit button is clicked", () => {
      const handleClick = jest.fn();
      render(
        <StepContainer title="Clickable Step" state="closed">
          <StepContainerClosed onClick={handleClick}>
            <div>Closed Content</div>
          </StepContainerClosed>
        </StepContainer>,
      );

      fireEvent.click(screen.getByText("Edit"));
      expect(handleClick).toHaveBeenCalled();
    });

    it("disables Edit button when disabled prop is true", () => {
      render(
        <StepContainer title="Disabled Edit" state="closed">
          <StepContainerClosed disabled={true}>
            <div>Closed Content</div>
          </StepContainerClosed>
        </StepContainer>,
      );

      expect(screen.getByText("Edit")).toBeDisabled();
    });
  });
});
