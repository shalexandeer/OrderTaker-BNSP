import { atom } from 'recoil'
import { localStorageEffect } from '../utils/storage'

export const isLoadingState = atom<boolean>({
  key: 'isLoadingState',
  default: false,
})

export const returnBackLinkState = atom<string | null>({
  key: 'returnBackLinkState',
  default: null,
  effects: [localStorageEffect('returnBackLinkState')],
})
