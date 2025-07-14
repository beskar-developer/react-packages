import type { INavigationItem } from "./NavigationItem.type";

export type Item = {
  path: string;
  label?: INavigationItem["label"];
  Icon?: INavigationItem["Icon"];
  children?: Item[];
};
export interface INavigationMenu {
  items: Item[];
  itemPadding?: number;
}
