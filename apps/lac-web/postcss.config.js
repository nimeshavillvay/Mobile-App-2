/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  plugins: {
    "postcss-import": {
      resolve: (importPath) => {
        if (importPath.startsWith("@repo/web-ui")) {
          return path.resolve(
            __dirname,
            "../../packages/web-ui/dist/index.css",
          );
        }
        return importPath;
      },
    },
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
