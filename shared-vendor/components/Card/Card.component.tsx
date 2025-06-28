interface Props extends ComponentProps<"div"> {
  scale?: boolean;
}

export const Card = ({ children, className, scale = false, ...props }: Props) => {
  return (
    <div
      {...props}
      className={`${className ?? ""} ${scale ? "hover:scale-120" : ""} cursor-pointer overflow-hidden rounded-lg border-2 border-transparent bg-white shadow-2xl ring-gray-900 transition-transform hover:border-2 hover:border-indigo-400 dark:bg-gray-800`}
    >
      {children}
    </div>
  );
};
