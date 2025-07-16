import type { IPagination } from "./Pagination.type";

export const PaginationContent = ({ totalPages, page }: Pick<IPagination, "totalPages" | "page">) => {
  return (
    <div className="flex min-w-10 shrink-0 items-center justify-center">
      <span className="text-xs text-gray-600 dark:text-gray-300">{totalPages}</span> / {page}
    </div>
  );
};
