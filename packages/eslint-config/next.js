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
  plugins: ["react-compiler", "prefer-arrow-functions", "import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
  rules: {
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/no-children-prop": "error",
    "react/prefer-read-only-props": "error",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-pascal-case": "error",
    "prefer-arrow-functions/prefer-arrow-functions": [
      "error",
      { allowNamedFunctions: true },
    ],
    curly: ["error", "all"],
    "import/newline-after-import": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["~/*"],
            message:
              'Direct importing from the web-ui package is not allowed. Import from "@repo/web-ui" instead.',
          },
          {
            group: ["react"],
            importNames: ["useEffect"],
            message:
              "`useEffect` often leads to bugs which are very hard to debug and code that is hard to develop and maintain. Please look for alternatives.",
          },
        ],
      },
    ],
    "react/jsx-pascal-case": "error",
    "react/jsx-no-leaked-render": "error",
  },
  overrides: [
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
