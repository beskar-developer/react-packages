import type { INavigationGroup } from "./NavigationGroup.type";

export const NavigationGroup = ({
  item,
  itemPadding = 0,
  active,
  expanded,
  onNavigate,
}: INavigationGroup) => {
  return (
    <div key={item.path} className="navigation-menu__group">
      <NavigationItem
        active={active}
        expanded={expanded}
        padding={itemPadding}
        onClick={() => onNavigate(item)}
        label={item.label}
        Icon={item.Icon}
      />

      <NavigationChildren children={item.children} expanded={expanded} itemPadding={itemPadding} />
    </div>
  );
};
