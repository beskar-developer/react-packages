import type { IPaginationButton } from "./PaginationButton.type";

export const PaginationButton = ({ direction, ...props }: IPaginationButton) => {
  return (
    <BaseButton icon {...props}>
      <PaginationButtonIcon direction={direction} />
    </BaseButton>
  );
};
