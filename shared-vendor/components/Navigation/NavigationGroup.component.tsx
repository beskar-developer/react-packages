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
        label={item.label}
        childrenCount={item.children?.length}
        Icon={item.Icon}
        onClick={() => onNavigate(item)}
      />

      <NavigationChildren children={item.children} expanded={expanded} itemPadding={itemPadding} />
    </div>
  );
};
