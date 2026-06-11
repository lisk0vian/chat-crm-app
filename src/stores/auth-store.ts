import type { AuthState } from '@/types'
import { create } from 'zustand'

export const useAuthStore = create<AuthState>()((set) => ({
  auth: {
    user: null,
    company: {
      id: null,
    },
    setUser: (user) =>
      set((state) => ({
        auth: { ...state.auth, user },
      })),
    setCompany: (company: { id: string }) =>
      set((state) => ({
        auth: {
          ...state.auth,
          company,
        },
      })),
    reset: () =>
      set((state) => ({
        auth: { ...state.auth, user: null, accessToken: '' },
      })),
  },
}))
