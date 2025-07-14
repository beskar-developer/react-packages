import type { INavigationMenu } from "./NavigationMenu.type";

export const NavigationMenu = ({ items, itemPadding = 0 }: INavigationMenu) => {
  const { isActive, isExpanded, navigateTo } = useNavigationMenu();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <NavigationGroup
          item={item}
          itemPadding={itemPadding}
          active={isActive(item)}
          expanded={isExpanded(item)}
          onNavigate={navigateTo}
        />
      ))}
    </nav>
  );
};
