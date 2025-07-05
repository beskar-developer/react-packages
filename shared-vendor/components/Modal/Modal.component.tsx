import type { Variant } from "motion";
import type { AnimationVariant, ModalProps, OpenProps, WindowProps } from "./Modal.type";

import { createPortal } from "react-dom";

import { AiFillCloseCircle } from "react-icons/ai";

const MODAL_ANIMATION_VARIANT: Record<AnimationVariant, Variant> = {
  initial: {
    clipPath: "circle(0 at 0% 50%)",
  },
  enter: {
    clipPath: "circle(140% at 0 14%)",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    clipPath: "circle(0 at 0% 50%)",
    transition: {
      duration: 0.64,
      ease: "easeInOut",
    },
  },
};

const ModalComponent = ({ children }: ModalProps) => {
  const value = useModal();

  return <context.Provider value={value}>{children}</context.Provider>;
};

const Open = ({ name = "default", render }: OpenProps) => {
  const open = useModalOpen(name);

  return render({ open });
};

const Window = ({ name = "default", render, title }: WindowProps) => {
  const { isOpen, ref } = useModalWindow(name);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={MODAL_ANIMATION_VARIANT}
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed top-[50%] left-[50%] z-20 flex h-screen w-screen translate-[-50%] items-center justify-center backdrop-blur-xs"
        >
          <Card
            className="flex min-w-100 flex-col gap-6 rounded-xl border-none px-4 py-6 dark:text-white"
            ref={ref}
          >
            <div className="flex items-center gap-4">
              <BaseButton onClick={close} icon variant="text" color="red">
                <AiFillCloseCircle />
              </BaseButton>

              {title && <span className="font-md font-bold">{title}</span>}
            </div>

            <div>{render({ onClose: close })}</div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

ModalComponent.Open = Open;
ModalComponent.Window = Window;

export const Modal = ModalComponent;
