# Web UI components

This package contains base components with minimal styling that can be imported and used across other projects in the monorepo.

## Usage

First add `postcss-import` to you PostCSS config and make sure it the first plugin.

```js
module.exports = {
  plugins: {
    "postcss-import": {},
    // ...
  },
};
```

Then add some additional configuration so that `postcss-import` package can correctly resolve the path of the CSS file.

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  plugins: {
    "postcss-import": {
      resolve: (importPath) => {
        if (importPath.startsWith("@repo/web-ui")) {
          const newPath = importPath.replace(
            "@repo/web-ui",
            "../../packages/web-ui/dist",
          );

          return path.resolve(__dirname, newPath);
        }
        return importPath;
      },
    },
    // ...
  },
};
```

After that, import the CSS file at the very top of the global CSS file.

```css
@import "@repo/web-ui/styles.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import the required components.

```tsx
import { Button } from "@repo/web-ui/ui/button";
```

## Optimizing the bundle

When bundling this package, certain dependencies will be excluded, such as `react`, `react-dom`, and `next`, as the expectation is they will always be installed in the main package.

These packages should be installed in this package with the `--save-peer` flag.

```shell
pnpm install react --save-peer
```

Then they need to be specified in **tsup** configuration file to be excluded by the bundler through the `external` field.
