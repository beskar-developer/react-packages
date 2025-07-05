type Open = (openName: string) => void;
type Close = () => void;

export interface Context {
  open: Open;
  close: Close;
  openName: string;
}

export type AnimationVariant = "initial" | "exit" | "enter";

export interface ModalProps {
  children: ReactNode;
}

export interface OpenProps {
  name?: string;
  render: ({ open }: { open: () => void }) => ReactNode;
}

export interface WindowProps {
  name?: string;
  render: ({ onClose }: { onClose: Close }) => ReactNode;
  title?: string;
}
