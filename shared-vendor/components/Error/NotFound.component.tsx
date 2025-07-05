import DetectiveSvg from "@shared-vendor/assets/svg/detective.svg?react";

interface Props extends MotionProps {
  message: string;
}

export const NotFound = ({ message, ...props }: Props) => {
  return (
    <motion.div
      className="flex size-full flex-col items-center justify-center gap-6 text-xl font-bold"
      {...props}
    >
      <DetectiveSvg />

      <span>{message}</span>
    </motion.div>
  );
};
