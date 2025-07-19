import type { INavigationChildren } from "./NavigationChildren.type";

const ANIMATION_CONFIG: MotionProps = {
  initial: { y: -10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.2, ease: "easeInOut" },
};

export const NavigationChildren = ({ expanded, itemPadding = 0, children }: INavigationChildren) => {
  if (!children) return <></>;

  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div {...ANIMATION_CONFIG}>
          <NavigationMenu itemPadding={itemPadding + 44} items={children} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
