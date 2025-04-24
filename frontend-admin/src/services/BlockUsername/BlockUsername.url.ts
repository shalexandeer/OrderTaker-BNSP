import axiosInstance from "../axiosInstance";

const getUsernames = (params: ParamsBody) => {
  const url = `/admin/block-username`;
  return axiosInstance.get(url, { params })
}

const createNewUsername = (data: {username: string}) => {
  const url = `/admin/block-username`;
  return axiosInstance.post(url, data)
}

const deleteUsername = (userId: string) => {
  const url = `/admin/block-username/${userId}`;
  return axiosInstance.delete(url)
}

export const BlockUsernameServices = { 
  getUsernames,
  createNewUsername,
  deleteUsername
}