import type { Context } from "./Modal.type";

import { CONTEXT_ERROR_MESSAGE } from "@shared-vendor/constants";

const DEFAULT_CONTENT: Context = {
  open: () => {},
  close: () => {},
  openName: "default",
};

export const ModalContext = createContext<Context>(DEFAULT_CONTENT);

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error(CONTEXT_ERROR_MESSAGE);

  return context;
};

export const useModal = () => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return {
    openName,
    close,
    open,
  };
};

export const useModalOpen = (name: string) => {
  const { open } = useModalContext();

  const wrappedOpen = () => open(name);

  return wrappedOpen;
};

export const useModalWindow = (name: string) => {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);

  const isOpen = name === openName;

  return {
    ref,
    isOpen,
    close,
  };
};
