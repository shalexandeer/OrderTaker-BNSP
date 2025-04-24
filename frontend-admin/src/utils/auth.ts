import { jwtDecode, JwtPayload } from 'jwt-decode'

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true

  const decodedToken = jwtDecode<JwtPayload>(token)
  const currentTime = Math.floor(Date.now() / 1000)

  return decodedToken.exp ? decodedToken.exp < currentTime : true
}
