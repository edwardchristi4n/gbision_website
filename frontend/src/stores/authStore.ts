import { create } from "zustand"

interface AdminUser { id: number; name: string; email: string; role: string }
interface AuthState {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AdminUser | null) => void
  setLoading: (v: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser:    (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (v)    => set({ isLoading: v }),
  logout:     ()     => set({ user: null, isAuthenticated: false }),
}))
