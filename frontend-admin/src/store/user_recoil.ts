import { atom } from 'recoil'
import { localStorageEffect } from '../utils/storage'

const userState = atom<User>({
  key: 'userState',
  default: {
    id: '',
    nickName: '',
    role: '',
    email: '',
    username: '',
    accountStatus: '',
    cashCoin: 0,
    eventPoint: 0,
    image: '',
  } as User,
  effects: [localStorageEffect('user')],
})

export { userState }
