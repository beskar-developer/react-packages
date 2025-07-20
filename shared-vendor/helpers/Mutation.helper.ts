import type { UseMutationOptions } from "@tanstack/react-query";

export const defineMutation = <
  TData = unknown,
  TError extends Error = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  return mutationOptions(options);
};
