import { useMutation } from "@tanstack/react-query";
import { mejaApiEndpoints, mejaKeys } from "./keys";
import { Meja, MejaCreatePayload, MejaUpdatePayload } from "./types";
import { ApiResponse } from "@/lib/types/api";
import axiosInstance from "./../axiosInstance";
import { queryClient } from "@/App";

export const useCreateMejaMutation = () => {
  return useMutation({
    mutationFn: async (payload: MejaCreatePayload) => {
      const response = await axiosInstance.post<ApiResponse<Meja>>(
        mejaApiEndpoints.create,
        payload,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mejaKeys.lists() });
    },
  });
};

export const useUpdateMejaMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & MejaUpdatePayload) => {
      const response = await axiosInstance.put<ApiResponse<Meja>>(
        mejaApiEndpoints.update(id),
        payload,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mejaKeys.lists() });
    },
  });
};

export const useDeleteMejaMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<ApiResponse<boolean>>(
        mejaApiEndpoints.delete(id),
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mejaKeys.lists() });
    },
  });
};
