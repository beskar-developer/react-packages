import type { Ref } from "react";

interface DefaultProps {
  name: string;
  label?: string;
  labelFallback?: ReactNode;
  hint?: string;
  errorMessage?: string;
  messageFallback?: ReactNode;
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  containerClassName?: string;
  containerRef?: Ref<HTMLDivElement>;
}

export type HTMLInputProps = ComponentProps<"input">;
export type HTMLTextAreaProps = ComponentProps<"textarea">;

export type InputProps = { textarea?: false } & DefaultProps & HTMLInputProps;
export type TextareaProps = { textarea: true } & DefaultProps & HTMLTextAreaProps;

export type Props = InputProps | TextareaProps;
