import type { Item } from "./NavigationMenu.type";

import { Set } from "@shared-vendor/helpers";

export const useNavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const expandedSet = new Set<Item>([{ path: location.pathname }], ({ path }) => path);

  const isActive = (item: Item) => location.pathname.includes(item.path);

  const isExpanded = (item: Item) => expandedSet.has(item) || item.children?.some(isExpanded);

  const expandItem = (item: Item) => {
    if (isExpanded(item)) {
      item?.children?.forEach((item) => expandedSet.delete(item));

      expandedSet.delete(item);

      return;
    }

    expandedSet.add(item);
  };

  const navigateTo = ({ children, path }: Item) => {
    if (!children) navigate(path);

    if (children) expandItem({ path, children });

    if (isActive({ path })) navigate(0);
  };

  return { isActive, isExpanded, navigateTo };
};
