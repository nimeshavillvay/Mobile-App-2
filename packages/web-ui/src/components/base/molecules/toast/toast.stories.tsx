import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/ui/button";
import type { ToastActionElement } from "./toast";
import { ToastAction } from "./toast";
import { Toaster } from "./toaster";
import { useToast } from "./use-toast";

const meta: Meta<typeof Toaster> = {
  title: "Base/Molecule/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

interface ToastConfig {
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: "default" | "destructive"; // Adjust based on your actual variants
}

const ToastExample: React.FC<{
  toastConfig: ToastConfig;
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

export const SimpleToast: Story = {
  render: () => (
    <ToastExample
      toastConfig={{ description: "Your message has been sent." }}
      buttonText="Simple"
    />
  ),
};

export const ToastWithTitle: Story = {
  render: () => (
    <ToastExample
      toastConfig={{
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      }}
      buttonText="With Title"
    />
  ),
};

export const ToastWithAction: Story = {
  render: () => (
    <ToastExample
      toastConfig={{
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your requests.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      }}
      buttonText="With Action"
    />
  ),
};

export const DestructiveToast: Story = {
  render: () => (
    <ToastExample
      toastConfig={{
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      }}
      buttonText="Destructive"
    />
  ),
};
