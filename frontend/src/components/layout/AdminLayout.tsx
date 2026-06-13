import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import { useAuth } from "@/hooks/useAuth"

export default function AdminLayout() {
  const { user } = useAuth()
  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <AdminSidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <header style={{ height:56, background:"#fff", borderBottom:"1px solid #E8EDF2", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 28px", flexShrink:0 }}>
          <div style={{ fontSize:13, color:"#64748B" }}>Selamat datang kembali, <span style={{ color:"#0D2240", fontWeight:600 }}>{user?.name ?? "Admin"}</span> 👋</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"#E8541A", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff" }}>
              {user?.name?.charAt(0) ?? "A"}
            </div>
          </div>
        </header>
        <main style={{ flex:1, overflowY:"auto", background:"#F8FAFC", padding:28 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
