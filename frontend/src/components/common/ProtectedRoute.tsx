import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return (
    <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:40, height:40, border:"3px solid #E8EDF2", borderTopColor:"#E8541A", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}
