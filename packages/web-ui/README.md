# Web UI components

This package contains base components with minimal styling that can be imported and used across other projects in the monorepo.

## Usage

Include the path of the components of this package from the project they are being used in. Exclude the Storybook Stories to make sure the classes used in the stories are not included.

```typescript
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/web-ui/src/**/*.{ts,tsx}",
    "!../../packages/web-ui/src/**/*.stories.{ts,tsx}",
  ],
  presets: [require("@repo/tailwindcss-config")],
};

export default config;
```

## Optimizing the bundle

When bundling this package, certain dependencies will be excluded, such as `react`, `react-dom`, and `next`, as the expectation is they will always be installed in the main package.

These packages should be installed in this package with the `--save-peer` flag.

```shell
pnpm install react --save-peer
```

Then they need to be specified in **tsup** configuration file to be excluded by the bundler through the `external` field.
