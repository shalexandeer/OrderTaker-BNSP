import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Users } from '../types/auth';
  
type AuthState = {
  user: Users | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthActions = {
  login: (user: Users) => void;
  logout: () => void;
  stopLoading: () => void;
};

type AuthStoreType = AuthState & AuthActions;
 
const useAuthStoreBase = create<AuthStoreType>()(
  immer((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: (user) => {
      localStorage.setItem('token', user.refresh_token);
      set((state) => {
        state.isAuthenticated = true;
        state.user = user;
      });
    },
    logout: () => {
      localStorage.removeItem('token');
      set((state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
    },
    stopLoading: () => {
      set((state) => {
        state.isLoading = false;
      });
    },
  }))
);
 
const useAuthStore = createSelectorHooks(useAuthStoreBase);
 
export default useAuthStore;