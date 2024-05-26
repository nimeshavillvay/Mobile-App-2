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
  rules: {
    "react-compiler/react-compiler": "error",
  },
};
