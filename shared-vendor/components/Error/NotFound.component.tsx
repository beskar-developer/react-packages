import DetectiveSvg from "@shared-vendor/assets/svg/detective.svg?react";

interface Props extends MotionProps {
  message: string;
  className?: string;
}

export const NotFound = ({ message, className, ...props }: Props) => {
  return (
    <motion.div
      className={twMerge(
        "flex size-full flex-col items-center justify-center gap-6 text-xl font-bold",
        className,
      )}
      {...props}
    >
      <DetectiveSvg />

      <span>{message}</span>
    </motion.div>
  );
};
