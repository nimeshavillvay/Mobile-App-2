export function toCamelCase(str: string): string {
  return str
    .split(/[\s_-]/) //Split the string by spaces, underscores, or hyphens
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}
