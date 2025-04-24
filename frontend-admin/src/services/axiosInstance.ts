// src/api/axiosInstance.ts
import axios from 'axios'
import { BASE_URL } from './url'
import { setAuthLocalStorageData } from '../utils/storage'
import { isTokenExpired } from '@/utils/auth'

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token') // or wherever you store the token

  if (token && isTokenExpired(token)) {
    try {
      token = await refreshToken()
      if (token) {
        localStorage.setItem('access_token', token)
      }
    } catch (error) {
      setAuthLocalStorageData('remove')
      return Promise.reject(new Error('Token expired'))
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refresh_token')

  if (!refreshToken) {
    throw new Error('No refresh token found')
  }

  const response = await axiosInstance.post(`/auth/refreshToken`, {
    refreshToken: localStorage.getItem('refresh_token'),
  })
  return response.data.data
}

export default axiosInstance
