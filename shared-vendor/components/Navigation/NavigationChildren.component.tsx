import type { INavigationChildren } from "./NavigationChildren.type";

export const NavigationChildren = ({ expanded, itemPadding = 0, children }: INavigationChildren) => {
  if (!children || !expanded) return <></>;

  return <NavigationMenu itemPadding={itemPadding + 44} items={children} />;
};
