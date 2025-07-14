import type { INavigationItem } from "./NavigationItem.type";

import { AiFillCaretDown } from "react-icons/ai";

export const NavigationExpandIcon = ({
  expanded,
  childrenCount,
}: Pick<INavigationItem, "expanded" | "childrenCount">) => {
  if (!childrenCount) return <></>;

  return <AiFillCaretDown className={twMerge(expanded && "rotate-180 transition-transform")} />;
};
