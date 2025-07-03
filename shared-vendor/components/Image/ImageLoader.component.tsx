interface Props extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  loading?: boolean;
  fallback?: ReactNode;
  errorMessage?: string;
}

const DEFAULT_ERROR_MESSAGE = "مشکلی در لود عکس به وجود آمده است!";

export const ImageLoader = ({
  src,
  alt,
  loading,
  fallback,
  errorMessage = DEFAULT_ERROR_MESSAGE,
  className,
  ...props
}: Props) => {
  const { dispatch, isActiveState } = useImageLoader(loading);

  const imageDisplayClassName = isActiveState("LOADING") ? "hidden" : "inline";

  return (
    <div className={twMerge("flex items-center justify-center overflow-hidden", className)} {...props}>
      {isActiveState("LOADING") && <Loading className="size-8 text-indigo-600" />}
      {isActiveState("ERROR") &&
        (fallback || <p className="text-indigo-600 dark:text-indigo-300">{errorMessage}</p>)}
      {isActiveState("IDLE") && (
        <img
          src={src}
          alt={alt}
          onError={() => dispatch("ON_ERROR")}
          onLoad={() => dispatch("ON_LOAD")}
          className={`h-full w-full object-cover ${imageDisplayClassName}`}
        />
      )}
    </div>
  );
};
