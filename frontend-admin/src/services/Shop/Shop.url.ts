import axiosInstance from "../axiosInstance";

const getAllItems = (params: ParamsBody) => {
  const url = `/admin/item-mall-table`;
  return axiosInstance.get(url, { params })
}

const getItemsById = (id: string) => {
  const url = `/admin/item-mall-detail/${id}`;
  return axiosInstance.get(url)
}

const createItemMall = (data: ItemMallBody) => {
  const url = `/admin/create-item-mall`;
  return axiosInstance.post(url, data)
}

const updateItemMall = (data: ItemMallBody, id: string) => {
  const url = `/admin/update-item-mall/${id}`;
  return axiosInstance.patch(url, data)
}

const deleteItemMall = (id: string) => {
  const url = `/admin/item-mall/${id}`;
  return axiosInstance.delete(url)
}

const searchItemMall = (params: ParamsBody) => {
  const url = '/admin/item-mall-table-search';
  return axiosInstance.get(url, {
    params
  })
}

const getItemMallCategory = () => {
  const url = '/admin/item-mall-category';
  return axiosInstance.get(url)
}

export const ShopServices = { 
  getAllItems,
  getItemsById,
  createItemMall,
  updateItemMall,
  deleteItemMall,
  searchItemMall,
  getItemMallCategory
}