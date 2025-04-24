import axiosInstance from "../axiosInstance";

const getUserDropdownData = (params: {username: string}) => {
  const url = '/admin/user-dropdown-info';
  return axiosInstance.get(url, {
    params
  })
}

const getAllUsers = (params: ParamsBody) => {
  const url = '/admin/user-table';
  return axiosInstance.get(url, {
    params
  })
}

const getUserById = (id: string) => {
  const url = `/admin/user-table/${id}`;
  return axiosInstance.get(url)
}

const searchUser = (params: ParamsBody) => {
  const url = '/admin/user-table-search';
  return axiosInstance.get(url, {
    params
  })
}

export const UserServices = {
  getUserDropdownData,
  getAllUsers,
  getUserById,
  searchUser
}