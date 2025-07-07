interface Props extends ComponentProps<"div"> {
  message?: string;
}

export const LoadingMessage = ({ message, className, ...props }: Props) => {
  return (
    <div className={twMerge("flex flex-col items-center justify-center gap-4", className)} {...props}>
      <Loading className="size-12 text-indigo-500" />

      <span className="font-bold">{message}</span>
    </div>
  );
};
