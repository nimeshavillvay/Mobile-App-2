module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindFunctions: ["cn", "cva"],
  tailwindAttributes: ["buttonClassName", "tw"],
  plugins: [
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
