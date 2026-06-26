import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const path = window.location.pathname
    if (err.response?.status === 401 && path.startsWith("/admin") && path !== "/admin/login")
      window.location.href = "/admin/login"
    return Promise.reject(err)
  }
)

export default api
