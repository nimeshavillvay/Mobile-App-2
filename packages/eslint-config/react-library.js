const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:jsx-a11y/strict",
    "prettier",
    "eslint-config-turbo",
  ],
  plugins: ["react-compiler", "prefer-arrow-functions", "import"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
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
};
