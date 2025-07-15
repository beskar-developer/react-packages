import type { Props as ButtonProps } from "@shared-vendor/components/Button/BaseButton.type";

export interface IPaginationButton extends ButtonProps {
  direction: "NEXT" | "PREVIOUS";
}
