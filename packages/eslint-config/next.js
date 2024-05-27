const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:jsx-a11y/strict",
    "next/core-web-vitals",
    "prettier",
    "eslint-config-turbo",
  ],
  plugins: ["react-compiler"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "react-compiler/react-compiler": "error",
  },
};
