import axiosInstance from "../axiosInstance";

const getReferrals = (params: ParamsBody) => {
  const url = `/admin/referral-table`;
  return axiosInstance.get(url, { params })
}

const getReferralById = (id: string) => {
  const url = `/admin/referral-table/${id}`;
  return axiosInstance.get(url)
}

const createReferralCode = (data: ReferralCodeBody) => {
  const url = `/admin/create-referral-code`;
  return axiosInstance.post(url, data)
}

const updateReferralCode = (data: ReferralCodeBody) => {
  const url = `/admin/update-referral-code`;
  return axiosInstance.patch(url, data)
}

const deleteReferralCode = (userId: string) => {
  const url = `/admin/referral/${userId}`;
  return axiosInstance.delete(url)
}

export const ReferralServices = { 
  getReferrals,
  getReferralById,
  createReferralCode,
  updateReferralCode,
  deleteReferralCode
}