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
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
