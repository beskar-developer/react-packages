const COLORS = ["red", "yellow", "emerald", "sky", "indigo"];

const random = (min = 1, max = 9) => Math.floor(Math.random() * max) + min;

export const generateRandomColor = () => {
  const shade = random() * 100;

  const colorIndex = random(0, COLORS.length - 1);

  return `var(--color-${COLORS[colorIndex]}-${shade})`;
};
