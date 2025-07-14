export interface INavigationItem extends ComponentProps<"div"> {
  label?: string;
  active?: boolean;
  expanded?: boolean;
  padding?: number;
  Icon?: ReactNode;
  childrenCount?: number;
}
