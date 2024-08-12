import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "~/lib/utils";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Base/Atom/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;
type SliderProps = React.ComponentProps<typeof Slider>;

export const DefaultSlider: Story = {
  render: ({ className, ...props }: SliderProps) => (
    <div className="flex flex-col space-y-2">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[30rem] bg-zinc-50/20 dark:bg-zinc-900/20", className)}
        {...props}
      />
    </div>
  ),
};
