import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GameClientServices } from "./ClientUrl.url";

export const useGetAllGameClients = () => {
  return useQuery<ClientUrlResponse>({
    queryKey: ["game-clients"],
    queryFn: async () => {
      const response = await GameClientServices.getAllGameClients();
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });
};

export function useCreateGameClient(
  options?: UseMutationOptions<
    ClientUrlResponse,
    AxiosError,
    ClientUrlBody
  >
) {
  const { mutate, isPending, isSuccess } = useMutation<
  ClientUrlResponse,
    AxiosError,
  ClientUrlBody
  >({
    mutationFn: async (body: { image: string; title: string; url: string }) => {
      const response = await GameClientServices.createGameClient(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useUpdateGameClient(
  options?: UseMutationOptions<
    ClientUrlResponse,
    AxiosError,
    ClientUrlBody
  >
) {
  const { mutate, isPending, isSuccess } = useMutation<
    ClientUrlResponse,
    AxiosError,
    ClientUrlBody
  >({
    mutationFn: async (body: ClientUrlBody) => {
      const response = await GameClientServices.updateGameClient(body.id ?? "", body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}