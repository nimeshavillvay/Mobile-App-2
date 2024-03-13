import "@/styles.css";
import type { Preview } from "@storybook/react";
import { fn } from "@storybook/test";

const preview: Preview = {
  args: { onClick: fn() },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
