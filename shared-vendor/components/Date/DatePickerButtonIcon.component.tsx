import type { IDatePickerButton } from "@shared-vendor/components/Date/DateField.type";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export const DatePickerButtonIcon = ({ direction }: Pick<IDatePickerButton, "direction">) => {
  const isRightDirection = direction === "right";

  if (isRightDirection) return <AiFillCaretLeft />;

  return <AiFillCaretRight />;
};
