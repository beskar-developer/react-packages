import { Toaster as HotToaster, type ToasterProps } from "react-hot-toast";

interface Props extends Omit<ToasterProps, "children"> {
  children?: ReactNode;
}

const TOAST_OPTIONS = {
  success: {
    className: "!bg-success-400 !text-success-100 !min-w-64",
    iconTheme: {
      primary: "var(--color-emerald-100)",
      secondary: "var(--color-emerald-400)",
    },
    duration: 3000,
  },
  error: {
    className: "!bg-error-400 !text-error-100 !min-w-64",
    iconTheme: {
      primary: "var(--color-red-100)",
      secondary: "var(--color-red-400)",
    },
    duration: 4000,
  },
};

export const Toaster = ({ children, ...props }: Props) => {
  return (
    <div>
      <HotToaster position="top-left" toastOptions={TOAST_OPTIONS} {...props} />

      {children}
    </div>
  );
};
