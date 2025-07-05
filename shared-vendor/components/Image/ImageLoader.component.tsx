import fallbackImageSrc from "@shared-vendor/assets/images/fallback.png";

interface Props extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  loading?: boolean;
  fallback?: ReactNode;
}

const DEFAULT_IMAGE_CLASS_NAME = "size-full object-cover";

export const ImageLoader = ({ src, alt, loading, fallback, className, ...props }: Props) => {
  const { dispatch, isActiveState } = useImageLoader(loading);

  const imageDisplayClassName = isActiveState("LOADING") ? "hidden" : "inline";

  return (
    <div className={twMerge("flex items-center justify-center overflow-hidden", className)} {...props}>
      {isActiveState("LOADING") && <Loading className="size-8 text-indigo-600" />}
      {isActiveState("ERROR") &&
        (fallback || <img src={fallbackImageSrc} className={DEFAULT_IMAGE_CLASS_NAME} />)}
      {isActiveState("IDLE") && (
        <img
          src={src}
          alt={alt}
          onError={() => dispatch("ON_ERROR")}
          onLoad={() => dispatch("ON_LOAD")}
          className={twMerge(DEFAULT_IMAGE_CLASS_NAME, imageDisplayClassName)}
        />
      )}
    </div>
  );
};
