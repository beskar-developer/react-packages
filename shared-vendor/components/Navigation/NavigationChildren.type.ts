import type { INavigationItem } from "./NavigationItem.type";
import type { INavigationMenu, Item } from "./NavigationMenu.type";

export interface INavigationChildren {
  children?: Item["children"];
  expanded: INavigationItem["expanded"];
  itemPadding: INavigationMenu["itemPadding"];
}
