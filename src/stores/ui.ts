
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIToast {
  intent: 'warning' | 'success',
  message: string,
}

interface Message {
  status: number,
  message: string,
  statusText: string,
}

interface UIState {
  dark: boolean,
  loading: boolean,
  loadingCount: number,
  toast: UIToast,
  message: Message,
}

const initialState: UIState = {
  dark: false,
  loading: false,
  loadingCount: 0,
  toast: { intent: 'success', message: '' },
  message: {
    status: 0,
    message: '',
    statusText: '',
  }
}

export const uiSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, { payload }: PayloadAction<boolean>) => {
      state.dark = payload
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingCount = payload ? state.loadingCount + 1 : state.loadingCount - 1;
      state.loading = state.loadingCount > 0;
    },
    setMessage: (state, { payload }: PayloadAction<Message>) => (
      { ...state, message: payload }
    ),
  }
})

export const {
  setDarkMode,
  setLoading,
  setMessage,
} = uiSlice.actions

export default uiSlice.reducer