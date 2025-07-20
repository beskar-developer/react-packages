import type { QueryFunction, UseQueryOptions } from "@tanstack/react-query";

export type DefineQueryOptions<
  TQueryFnData,
  TError extends Error = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryFn" | "initialData"> & {
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
};

export const defineQuery = <
  TQueryFnData = unknown,
  TError extends Error = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>({
  initialData,
  queryFn,
  ...options
}: DefineQueryOptions<TQueryFnData, TError, TData, TQueryKey> & { initialData: unknown }) => {
  return queryOptions({
    queryFn,
    initialData: initialData as Awaited<ReturnType<typeof queryFn>>,
    initialDataUpdatedAt: 0,
    ...options,
  }) as DefineQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    initialData: NonNullable<TData>;
  };
};
