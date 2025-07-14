import type { INavigationItem } from "./NavigationItem.type";
import type { INavigationMenu, Item } from "./NavigationMenu.type";

type UseNavigationMenuReturn = ReturnType<typeof useNavigationMenu>;

export interface INavigationGroup {
  item: Item;
  itemPadding?: INavigationMenu["itemPadding"];
  active: INavigationItem["active"];
  expanded: INavigationItem["expanded"];
  onNavigate: UseNavigationMenuReturn["navigateTo"];
}
