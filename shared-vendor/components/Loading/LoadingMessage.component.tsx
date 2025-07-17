interface Props extends ComponentProps<"div"> {
  message?: string;
}

export const LoadingMessage = ({ message, className, ...props }: Props) => {
  return (
    <div className={twMerge("flex flex-col items-center justify-center gap-4", className)} {...props}>
      <Loading className="text-primary-500 size-12" />

      <span className="font-bold">{message}</span>
    </div>
  );
};
