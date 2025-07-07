import { itemAnimationConfig } from "@shared-vendor/constants";

interface Props {
  children: ReactNode;
  itemCount: number;
  message: string;
}

export const NotFoundContainer = ({ children, message, itemCount }: Props) => {
  return (
    <AnimatePresence>
      {!itemCount ? <NotFound message={message} {...itemAnimationConfig} /> : <>{children}</>}
    </AnimatePresence>
  );
};
