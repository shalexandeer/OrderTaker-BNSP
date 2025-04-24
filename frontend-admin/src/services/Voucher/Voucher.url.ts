import axiosInstance from "../axiosInstance";

const getVouchers = (params: ParamsBody) => {
  const url = `/Admin/voucher-table`;
  return axiosInstance.get(url, { params })
}

const getVoucherById = (id: string) => {
  const url = `/Admin/voucher-table/${id}`;
  return axiosInstance.get(url)
}

const createVoucher = (data: VoucherBody[]) => {
  const url = `/VoucherAdmin/create`;
  return axiosInstance.post(url, data)
}

const updateVoucher = (data: VoucherBody, id: string) => {
  const url = `/VoucherAdmin/update/${id}`;
  return axiosInstance.put(url, data)
}

const deleteVoucher = (id: string) => {
  const url = `/VoucherAdmin/delete/${id}`;
  return axiosInstance.delete(url)
}

export const VoucherServices = { 
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher
}