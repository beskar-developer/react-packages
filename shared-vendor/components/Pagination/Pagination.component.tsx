import type { IPagination } from "./Pagination.type";

export const Pagination = ({ page, totalPages, onPageChange }: IPagination) => {
  const { isNextDisabled, isPreviousDisabled, goToNext, goToPrevious } = usePagination({
    page,
    totalPages,
    onPageChange,
  });

  return (
    <div className="flex items-center gap-4">
      <PaginationButton direction="NEXT" disabled={isNextDisabled} onClick={goToNext} />

      <PaginationContent page={page} totalPages={totalPages} />

      <PaginationButton direction="PREVIOUS" disabled={isPreviousDisabled} onClick={goToPrevious} />
    </div>
  );
};
