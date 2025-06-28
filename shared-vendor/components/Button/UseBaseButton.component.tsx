import type { MouseEvent } from "react";

import type { Props } from "./BaseButton.type";

export const useBaseButton = ({
  disabled,
  loading,
  onClick,
}: Pick<Props, "disabled" | "loading" | "onClick">) => {
  const wrapOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (disabled || loading) return;

    onClick?.(event);
  };

  return { onClick: wrapOnClick };
};
