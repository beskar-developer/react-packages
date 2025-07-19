import type { INavigationItem } from "./NavigationItem.type";

export const NavigationItem = ({
  Icon,
  label,
  active,
  expanded,
  padding,
  childrenCount,
  ...props
}: INavigationItem) => {
  const style = padding ? { paddingRight: `${padding}px` } : {};

  return (
    <div
      className={twMerge(
        "font-sm flex cursor-pointer items-center justify-between rounded-md px-2 py-2.5 select-none",
        !active && "hover:bg-surface-200 dark:hover:bg-surface-700",
        active && !childrenCount && "bg-primary-500 text-white",
        active && childrenCount && "text-primary-500",
      )}
      style={style}
      {...props}
    >
      <NavigationItemContent Icon={Icon} label={label} />

      <NavigationExpandIcon expanded={expanded} childrenCount={childrenCount} />
    </div>
  );
};
