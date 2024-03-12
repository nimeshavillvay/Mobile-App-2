import type { Meta, StoryObj } from "@storybook/react";
import { SearchBox, SearchBoxButton, SearchBoxInput } from "./search-box";

const meta: Meta<typeof SearchBox> = {
  title: "Components/Search Box",
  component: SearchBox,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  render: () => {
    return (
      <SearchBox style={{ width: 400, maxWidth: "100%" }}>
        <SearchBoxInput placeholder="What are you looking for?" />

        <SearchBoxButton />
      </SearchBox>
    );
  },
};
