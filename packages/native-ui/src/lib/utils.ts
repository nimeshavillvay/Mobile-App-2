export const convertToRGBA = (color: string, alpha: number): string => {
  const hexToRGB = (hex: string): number[] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  // Function to parse RGB string
  const parseRGB = (rgb: string): number[] => {
    return rgb.match(/\d+/g)!.map(Number);
  };

  let rgb: number[];

  if (color.startsWith("#")) {
    rgb = hexToRGB(color);
  } else if (color.startsWith("rgb")) {
    rgb = parseRGB(color);
  } else {
    rgb = parseRGB("rgb(255,255,255)");
  }

  if (alpha > 1 || alpha < 0) {
    alpha = 1;
  }

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};
