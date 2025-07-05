import type { Variant } from "motion";
import { createPortal } from "react-dom";

import { AiFillCloseCircle } from "react-icons/ai";

type Open = (openName: string) => void;
type Close = () => void;
type AnimationVariant = "initial" | "exit" | "enter";

interface Context {
  open: Open;
  close: Close;
  openName: string;
}

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  name?: string;
  render: ({ open }: { open: () => void }) => ReactNode;
}

interface WindowProps {
  name?: string;
  render: ({ onClose }: { onClose: Close }) => ReactNode;
  title?: string;
}

const DEFAULT_CONTENT = {
  open: () => {},
  close: () => {},
  openName: "default",
};
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

const ModalContext = createContext<Context>(DEFAULT_CONTENT);

const ModalComponent = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
};

const Open = ({ name = "default", render }: OpenProps) => {
  const { open } = useContext(ModalContext);

  return render({ open: () => open(name) });
};

const Window = ({ name = "default", render, title }: WindowProps) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  const isOpen = name === openName;

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
