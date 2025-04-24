import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { VoucherServices } from "./Voucher.url";

export const useGetVouchers = (params: ParamsBody) => {
  return useQuery<VoucherResponse>({
    queryKey: ["vouchers", params],
    queryFn: async () => {
      const response = await VoucherServices.getVouchers(params);
      return response?.data;
    }
  });
};

export const useGetVoucherById = (id: string, enabled: boolean) => {
  return useQuery<VoucherWithIdBody>({
    queryKey: ["voucher-id", id],
    queryFn: async () => {
      const response = await VoucherServices.getVoucherById(id);
      return response?.data;
    },
    enabled
  });
};

export function useCreateVoucher(
  options?: UseMutationOptions<
    VoucherResponse,
    AxiosError,
    VoucherBody[]
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    VoucherResponse,
    AxiosError,
    VoucherBody[]
  >({
    mutationFn: async (body: VoucherBody[]) => {
      const response = await VoucherServices.createVoucher(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useUpdateVoucher(
  options?: UseMutationOptions<
    VoucherResponse,
    AxiosError,
    VoucherBody
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    VoucherResponse,
    AxiosError,
    VoucherUpdateBody
  >({
    mutationFn: async (body: VoucherUpdateBody) => {
      const response = await VoucherServices.updateVoucher(body, body?.id);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useDeleteVoucher(
  options?: UseMutationOptions<
    ReferralCodeResponse,
    AxiosError,
    string
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    ReferralCodeResponse,
    AxiosError,
    string
  >({
    mutationFn: async (id: string) => {
      const response = await VoucherServices.deleteVoucher(id);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}