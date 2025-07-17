import type { IPagination } from "./Pagination.type";

export const PaginationContent = ({ totalPages, page }: Pick<IPagination, "totalPages" | "page">) => {
  return (
    <div className="flex min-w-10 shrink-0 items-center justify-center sm:min-w-20">
      <span className="text-surface-600 dark:text-surface-300 text-xs">{totalPages}</span> / {page}
    </div>
  );
};
