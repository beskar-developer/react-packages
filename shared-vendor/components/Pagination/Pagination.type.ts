export interface IPagination {
  page: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}
