import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DatePicker from "./date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Base/Molecules/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const DatePickerStory: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <DatePicker
      date={selectedDate}
      onSelectDate={(date) => setSelectedDate(date)}
    />
  );
};

export const Default: Story = {
  render: () => <DatePickerStory />,
};
