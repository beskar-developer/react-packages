export const itemAnimationConfig: MotionProps = {
  layout: true,
  initial: { opacity: 0, x: -400, scale: 0.5 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 200, scale: 1.2 },
  transition: { duration: 0.6, type: "spring" },
};
