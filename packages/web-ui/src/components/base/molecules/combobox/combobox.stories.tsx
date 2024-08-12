import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Combobox } from "./combobox"; // Adjust the import path as necessary

// Sample frameworks data for the combobox
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const meta: Meta<typeof Combobox> = {
  title: "Base/Molecules/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const ComboboxStory: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Combobox
      value={selectedFramework}
      onSelect={setSelectedFramework}
      frameworks={frameworks}
      open={isOpen}
      setOpen={setIsOpen}
      placeholder="Select a framework..."
    />
  );
};

export const Default: Story = {
  render: () => <ComboboxStory />,
};
