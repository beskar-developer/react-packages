import type { IPagination } from "./Pagination.type";

export const usePagination = ({ page, totalPages, onPageChange }: IPagination) => {
  const isNextDisabled = page >= totalPages;
  const isPreviousDisabled = page <= 1;

  const goToNext = () => {
    if (isNextDisabled) return;

    onPageChange(page + 1);
  };

  const goToPrevious = () => {
    if (isPreviousDisabled) return;

    onPageChange(page - 1);
  };

  return { isNextDisabled, isPreviousDisabled, goToNext, goToPrevious };
};
