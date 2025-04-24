interface LoginForm {
  username: string
  password: string
}

interface User {
  id: string
  nickName: string
  role: string
  email: string
  username: string
  accountStatus: string
  cashCoin: number
  eventPoint: number
  image: string
}

interface RegisterBody {
  email: string
  username: string
  nickName: string
  pin: string
  password: string
}

interface UserTableData {
  id: string
  username: string
  email: string
  role: string
  emailConfirmed: boolean
  emailConfirmedDate: string
  createdAt: string
  updatedAt: string
}
