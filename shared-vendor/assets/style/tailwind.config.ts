import type { Config } from "tailwindcss";

const SHADES = [50, ...Array.from({ length: 9 }, (_, index) => (index + 1) * 100)];
const BASE_COLORS = {
  primary: "indigo",
  info: "sky",
  success: "emerald",
  error: "red",
  warning: "yellow",
  surface: "gray",
};

const generateShadesByColor = (color: string) =>
  SHADES.reduce(
    (shades, shade) => ({
      ...shades,
      [shade]: `var(--color-${color}-${shade})`,
    }),
    {},
  );
const generatesColors = (colorMap: Record<string, string>) =>
  Object.entries(colorMap).reduce(
    (colors, [semanticColor, color]) => ({
      ...colors,
      [semanticColor]: generateShadesByColor(color),
    }),
    {},
  );

const config: Config = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}", "./packages/**/*.{html,ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      color: generatesColors(BASE_COLORS),
      fontFamily: {
        sans: ["vazir"],
      },
    },
  },
};

export default config;
