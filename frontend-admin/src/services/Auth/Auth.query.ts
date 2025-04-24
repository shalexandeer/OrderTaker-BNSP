import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthServices } from "./Auth.url";
import { AxiosError } from "axios";

export function useLogin(
  options?: UseMutationOptions<AuthResponse, AxiosError, LoginBody>,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    AuthResponse,
    AxiosError,
    LoginBody
  >({
    mutationFn: async ({ username, password }: LoginBody) => {
      const response = await AuthServices.login(username, password);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useRegister(
  options?: UseMutationOptions<AuthResponse, AxiosError, RegisterBody>,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    AuthResponse,
    AxiosError,
    RegisterBody
  >({
    mutationFn: async (body: RegisterBody) => {
      const response = await AuthServices.register(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useAdminLogout(
  options?: UseMutationOptions<void, unknown, void>,
) {
  const { mutate, isPending, isSuccess } = useMutation<void, unknown, void>({
    mutationFn: async () => {
      const response = await AuthServices.logout();
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}
