import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const COMMUNITY_ROLES = ["admin_remaja", "admin_pemuda", "admin_kaum_pria", "admin_kaum_wanita"]

// Halaman yang boleh diakses oleh community admin
const COMMUNITY_ALLOWED = ["/admin", "/admin/komunitas"]

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #E8EDF2", borderTopColor: "#E8541A", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  // Community admin hanya boleh akses halaman tertentu
  const role = user?.role ?? ""
  if (COMMUNITY_ROLES.includes(role)) {
    const allowed = COMMUNITY_ALLOWED.some(path =>
      location.pathname === path || location.pathname.startsWith(path + "/")
    )
    if (!allowed) return <Navigate to="/admin/komunitas" replace />
  }

  return <Outlet />
}
