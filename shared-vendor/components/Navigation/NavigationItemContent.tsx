import type { INavigationItem } from "./NavigationItem.type";

export const NavigationItemContent = ({ Icon, label }: Pick<INavigationItem, "Icon" | "label">) => {
  return (
    <div className="flex items-center gap-2">
      {Icon}

      <span>{label}</span>
    </div>
  );
};
