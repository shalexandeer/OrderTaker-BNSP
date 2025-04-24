import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BlockUsernameServices } from "./BlockUsername.url";

export const useGetUsernames = (params: ParamsBody) => {
  return useQuery<BlockedUsernameResponse>({
    queryKey: ["blocked-usernames", params],
    queryFn: async () => {
      const response = await BlockUsernameServices.getUsernames(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });
};

export function useCreateNewUsername(
  options?: UseMutationOptions<
    BlockedUsernameResponse,
    AxiosError,
    { username: string }
  >
) {
  const { mutate, isPending, isSuccess } = useMutation<
    BlockedUsernameResponse,
    AxiosError,
    { username: string }
  >({
    mutationFn: async (body: { username: string }) => {
      const response = await BlockUsernameServices.createNewUsername(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useDeleteUsername(
  options?: UseMutationOptions<BaseResponse, AxiosError, string>
) {
  const { mutate, isPending, isSuccess } = useMutation<
    BaseResponse,
    AxiosError,
    string
  >({
    mutationFn: async (userId: string) => {
      const response = await BlockUsernameServices.deleteUsername(userId);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}