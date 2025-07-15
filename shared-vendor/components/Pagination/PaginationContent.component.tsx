import type { IPagination } from "./Pagination.type";

export const PaginationContent = ({ totalPages, page }: Pick<IPagination, "totalPages" | "page">) => {
  return (
    <div>
      <span className="text-xs text-gray-600 dark:text-gray-300">{totalPages}</span> / {page}
    </div>
  );
};
