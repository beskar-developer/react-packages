import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import type { IPaginationButton } from "./PaginationButton.type";

export const PaginationButtonIcon = ({ direction }: Pick<IPaginationButton, "direction">) => {
  const isNext = direction === "NEXT";

  if (isNext) return <AiFillCaretRight />;

  return <AiFillCaretLeft />;
};
