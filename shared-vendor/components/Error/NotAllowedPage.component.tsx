import ErrorSvg from "@shared-vendor/assets/svg/error.svg?react";

export const NotAllowedPage = () => {
  return (
    <div
      className={twMerge(
        "app-container flex size-full flex-col items-center justify-center p-0",
        "bg-primary-100 dark:bg-surface-900",
      )}
    >
      <ErrorSvg className="size-60" />

      <span className="text-error-400 text-xl font-extrabold">به این صفحه دسترسی ندارید</span>
    </div>
  );
};
