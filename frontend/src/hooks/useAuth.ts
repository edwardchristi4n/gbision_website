import { useEffect } from "react"
import { useAuthStore } from "@/stores/authStore"
import api from "@/lib/axios"

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, logout } = useAuthStore()

  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password })
    setUser(res.data.user)
    return res.data
  }

  const logoutUser = async () => {
    await api.post("/auth/logout").catch(() => {})
    logout()
    window.location.href = "/admin/login"
  }

  return { user, isAuthenticated, isLoading, login, logout: logoutUser }
}
