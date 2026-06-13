import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { LayoutDashboard, BookOpen, Image, Users, Calendar, Bell, UserCircle, Settings, LogOut, Church } from "lucide-react"

const menu = [
  { to:"/admin",              label:"Dashboard",    icon:LayoutDashboard },
  { to:"/admin/program",      label:"Program",      icon:Church },
  { to:"/admin/blog",         label:"Blog",         icon:BookOpen },
  { to:"/admin/galeri",       label:"Galeri",       icon:Image },
  { to:"/admin/pendeta",      label:"Pendeta",      icon:UserCircle },
  { to:"/admin/jadwal",       label:"Jadwal",       icon:Calendar },
  { to:"/admin/pengumuman",   label:"Pengumuman",   icon:Bell },
  { to:"/admin/users",        label:"Users",        icon:Users },
]

export default function AdminSidebar() {
  const { logout, user } = useAuth()
  return (
    <aside style={{ width:240, background:"#0D2240", display:"flex", flexDirection:"column", height:"100vh", fontFamily:"'Plus Jakarta Sans',sans-serif", flexShrink:0 }}>
      <div style={{ padding:"24px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>GBI Sion <span style={{ color:"#E8541A" }}>Admin</span></div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>CMS Dashboard</div>
      </div>

      <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
        {menu.map(m => (
          <NavLink key={m.to} to={m.to} end={m.to === "/admin"}
            style={({ isActive }) => ({
              display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
              borderRadius:10, textDecoration:"none", marginBottom:2,
              fontSize:14, fontWeight:500, transition:"all 0.15s",
              color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
              background: isActive ? "rgba(232,84,26,0.2)" : "transparent",
              borderLeft: isActive ? "3px solid #E8541A" : "3px solid transparent",
            })}
          >
            <m.icon size={18} />
            {m.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding:"16px 12px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", marginBottom:4 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#E8541A", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>
            {user?.name?.charAt(0) ?? "A"}
          </div>
          <div style={{ overflow:"hidden" }}>
            <div style={{ fontSize:13, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.name ?? "Admin"}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{user?.role ?? "admin"}</div>
          </div>
        </div>
        <button onClick={logout} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", width:"100%", background:"transparent", border:"none", cursor:"pointer", borderRadius:10, fontSize:14, color:"rgba(255,100,80,0.8)", fontFamily:"inherit", fontWeight:500, transition:"all 0.15s" }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  )
}
