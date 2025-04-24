import { useQuery } from "@tanstack/react-query";
import { UserServices } from "./Users.url";

export const useGetUserDropdownInfo = (query: string) => {
  return useQuery<UserDropdownInfoResponse>({
    queryKey: ["user-dropdown-info"],
    queryFn: async () => {
      const response = await UserServices.getUserDropdownData({username: query});
      return response?.data;
    },
    enabled: query?.length > 3,
  });
};

interface GetUsersParams extends ParamsBody {
  orderBy?: string
}

export const useGetAllUsers = (params: GetUsersParams) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await UserServices.getAllUsers(params);
      return response?.data;
    },
  });
};

interface UserByIdResponse extends BaseResponse {
  data: {
    id: string;
    role: string;
    username: string;
    regDate: string;
    userLevel: number;
    charName: string;
    gameserverBurnho: number;
    serverenterTime: string;
    enterIp: string;
    recordLock: number;
    lockTime: number;
    gameBlock: string;
    deleteFlag: number;
    deleteDate: string;
    payFlag: number;
    updateDate: string;
    nickName: string;
    email: string;
    emailConfirmed: boolean;
    emailConfirmedDate: string;
    tSealBlessing: string;
    tCharSlot: number;
    tAttendanceMonth: number;
    tAttendanceYday: number;
    tAttendanceReward: number;
    tRewardTime: number;
    tRewardTimeLast: number;
    point: number;
    eventPoint: number;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
  }
}

export const useGetUserById = (id: string, enabled: boolean) => {
  return useQuery<UserByIdResponse>({
    queryKey: ["users-id", id],
    queryFn: async () => {
      const response = await UserServices.getUserById(id);
      return response?.data;
    },
    enabled
  });
};

export const useSearchUser = (params: ParamsBody) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await UserServices.searchUser(params);
      return response?.data;
    },
    enabled: (params.querySearch?.length ?? 0) > 3,
  });
};