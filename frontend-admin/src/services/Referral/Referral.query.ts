import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { ReferralServices } from "./Referral.url";
import { AxiosError } from "axios";

export const useGetReferrals = (params: ParamsBody) => {
  return useQuery<ReferralsResponse>({
    queryKey: ["referrals", params],
    queryFn: async () => {
      const response = await ReferralServices.getReferrals(params);
      return response?.data;
    }
  });
};

export const useGetReferralById = (id: string, enabled: boolean) => {
  return useQuery<ReferralsResponseById>({
    queryKey: ["referral-by-id", id],
    queryFn: async () => {
      const response = await ReferralServices.getReferralById(id);
      return response?.data;
    },
    enabled
  });
};

export function useCreateReferralCode(
  options?: UseMutationOptions<
    ReferralCodeResponse,
    AxiosError,
    ReferralCodeBody
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    ReferralCodeResponse,
    AxiosError,
    ReferralCodeBody
  >({
    mutationFn: async (body: ReferralCodeBody) => {
      const response = await ReferralServices.createReferralCode(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useUpdateReferral(
  options?: UseMutationOptions<
    ReferralCodeResponse,
    AxiosError,
    ReferralCodeBody
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    ReferralCodeResponse,
    AxiosError,
    ReferralCodeBody
  >({
    mutationFn: async (body: ReferralCodeBody) => {
      const response = await ReferralServices.updateReferralCode(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useDeleteReferralCode(
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
    mutationFn: async (userId: string) => {
      const response = await ReferralServices.deleteReferralCode(userId);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}