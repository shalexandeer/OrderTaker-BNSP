import { useQuery } from "@tanstack/react-query";
import UserService from "./user.url";

export const useGetRoomInfo = (
  hotelId: number,
  roomNo: number,
  placeType: string,
) => {
  return useQuery({
    queryKey: ["user-room-info"],
    queryFn: async () => {
      const { data } = await UserService.getUserInfo(hotelId, roomNo);
      return data.data;
    },
    enabled: placeType === "room",
  });
};
