import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Button } from "~/components/ui/button";
import { ToastAction, type ToastActionElement } from "./toast";
import { Toaster } from "./toaster";
import { useToast } from "./use-toast";

// Define the ToastExample component
const ToastExample: React.FC<{
  toastConfig: {
    title?: string;
    description?: string;
    action?: ToastActionElement;
    variant?: "default" | "destructive";
  };
  buttonText: string;
}> = ({ toastConfig, buttonText }) => {
  const { toast } = useToast();

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-1 gap-4">
        <Button
          onClick={() =>
            toast({
              description: toastConfig.description,
              variant: toastConfig.variant,
              title: toastConfig.title,
              action: toastConfig.action,
            })
          }
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

describe("ToastExample Component", () => {
  it("renders and triggers a toast correctly", async () => {
    render(
      <ToastExample
        toastConfig={{
          description: "Your message has been sent.",
          title: "Message Sent",
        }}
        buttonText="Show Toast"
      />,
    );

    // Assert that the button is rendered
    const triggerButton = screen.getByText("Show Toast");
    expect(triggerButton).toBeInTheDocument();

    // Click the button to trigger the toast
    fireEvent.click(triggerButton);
    expect(await screen.findByText("Message Sent")).toBeInTheDocument();
  });

  it("renders and triggers a toast correctly", async () => {
    render(
      <ToastExample
        toastConfig={{
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your requests.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        }}
        buttonText="Show Toast"
      />,
    );

    // Assert that the button is rendered
    const triggerButton = screen.getByText("Show Toast");
    expect(triggerButton).toBeInTheDocument();

    // Click the button to trigger the toast
    fireEvent.click(triggerButton);
    await waitFor(() => {
      expect(
        screen.getByText("Uh oh! Something went wrong."),
      ).toBeInTheDocument();
    });

    // Assert that the toast action is rendered and click it
    const toastAction = screen.getByRole("button", { name: /try again/i });
    expect(toastAction).toBeInTheDocument();

    // Click the toast action button
    fireEvent.click(toastAction);

    await waitFor(() => {
      expect(
        screen.queryByText("Uh oh! Something went wrong."),
      ).not.toBeInTheDocument();
    });
  });
});
