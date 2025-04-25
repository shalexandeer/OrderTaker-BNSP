import {
  UseMutationOptions,
  UseQueryOptions,
  useQuery as useRQQuery,
  useMutation as useRQMutation,
} from "@tanstack/react-query";
import { ApiError } from "../types/api";

export function useMutation<TData = unknown, TVariables = void>(
  options: Omit<
    UseMutationOptions<TData, ApiError, TVariables>,
    "mutationFn"
  > & {
    mutationFn: (variables: TVariables) => Promise<TData>;
  }
) {
  return useRQMutation<TData, ApiError, TVariables>(options);
}

// Custom useQuery with pre-defined error type
export function useQuery<TData = unknown>(
  options: Omit<UseQueryOptions<TData, ApiError>, "queryFn"> & {
    queryFn: () => Promise<TData>;
  }
) {
  return useRQQuery<TData, ApiError>(options);
}
