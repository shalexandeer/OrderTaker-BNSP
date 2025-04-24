import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventServices } from "./Events.url";

export const useGetEvents = (params: ParamsBody) => {
  return useQuery<EventResponse>({
    queryKey: ["events", params],
    queryFn: async () => {
      const response = await EventServices.getEvents(params);
      return response?.data;
    }
  });
};

export const useGetEventById = (id: string, enabled: boolean) => {
  return useQuery<EventResponseById>({
    queryKey: ["event-by-id", id],
    queryFn: async () => {
      const response = await EventServices.getEventById(id);
      return response?.data;
    },
    enabled
  });
};

export function useCreateEvent(
  options?: UseMutationOptions<
    EventResponse,
    AxiosError,
    EventBody
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    EventResponse,
    AxiosError,
    EventBody
  >({
    mutationFn: async (body: EventBody) => {
      const response = await EventServices.createEvent(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useUpdateEvent(
  options?: UseMutationOptions<
    EventResponse,
    AxiosError,
    EventBody
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    EventResponse,
    AxiosError,
    EventBody
  >({
    mutationFn: async (body: EventBody) => {
      const response = await EventServices.updateEvent(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useDeleteEvent(
  options?: UseMutationOptions<
    EventResponse,
    AxiosError,
    string
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    EventResponse,
    AxiosError,
    string
  >({
    mutationFn: async (userId: string) => {
      const response = await EventServices.deleteEvent(userId);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}


export const useGetEventCategories= (params: ParamsBody) => {
  return useQuery<EventCategoryResponse>({
    queryKey: ["event-category"],
    queryFn: async () => {
      const response = await EventServices.getEventCategories(params);
      return response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000,
  });
};



export function useCreateEventCategory(
  options?: UseMutationOptions<
    EventCategoryResponse,
    AxiosError,
    {name: string}
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    EventCategoryResponse,
    AxiosError,
     {name: string}
  >({
    mutationFn: async (body: {name: string}) => {
      const response = await EventServices.createEventCategory(body);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}


export function useUpdateEventCategory(
  options?: UseMutationOptions<
    EventCategoryResponse,
    AxiosError,
    {name: string; id: string}
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    EventCategoryResponse,
    AxiosError,
    {name: string; id: string}
  >({
    mutationFn: async (body: {name: string, id: string}) => {
      const response = await EventServices.updateEventCategorty(body, body.id);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

export function useDeleteEventCategory(
  options?: UseMutationOptions<
    BaseResponse,
    AxiosError,
    string
  >,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    BaseResponse,
    AxiosError,
    string
  >({
    mutationFn: async (id: string) => {
      const response = await EventServices.deleteEventCategory(id);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

