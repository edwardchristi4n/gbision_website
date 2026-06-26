import { NavLink } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { LayoutDashboard, BookOpen, Image, Users, Calendar, Bell, LogOut, Church, Users2 } from "lucide-react"
import logo from "@/assets/images/logo.jpg"

const FULL_ADMIN_MENU = [
  { to:"/admin",            label:"Dashboard",   icon:LayoutDashboard },
  { to:"/admin/program",    label:"Program",     icon:Church },
  { to:"/admin/blog",       label:"Blog",        icon:BookOpen },
  { to:"/admin/galeri",     label:"Galeri",      icon:Image },
  { to:"/admin/jadwal",     label:"Jadwal",      icon:Calendar },
  { to:"/admin/pengumuman", label:"Pengumuman",  icon:Bell },
  { to:"/admin/komunitas",  label:"Komunitas",   icon:Users2 },
  { to:"/admin/users",      label:"Users",       icon:Users },
]

const COMMUNITY_MENU = [
  { to:"/admin",           label:"Dashboard",  icon:LayoutDashboard },
  { to:"/admin/komunitas", label:"Komunitas",  icon:Users2 },
]

const ROLE_LABELS: Record<string, string> = {
  superadmin:        "Super Admin",
  admin:             "Admin",
  admin_remaja:      "Admin Remaja",
  admin_pemuda:      "Admin Pemuda",
  admin_kaum_pria:   "Admin Kaum Pria",
  admin_kaum_wanita: "Admin Kaum Wanita",
}

const COMMUNITY_ROLES = ["admin_remaja", "admin_pemuda", "admin_kaum_pria", "admin_kaum_wanita"]

export default function AdminSidebar({ onClose }: { onClose?: () => void } = {}) {
  const { logout, user } = useAuth()
  const role = user?.role ?? ""
  const menu = COMMUNITY_ROLES.includes(role) ? COMMUNITY_MENU : FULL_ADMIN_MENU

  return (
    <aside style={{ width:240, background:"#0D2240", display:"flex", flexDirection:"column", height:"100vh", fontFamily:"'Plus Jakarta Sans',sans-serif", flexShrink:0 }}>
      <div style={{ padding:"24px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <img src={logo} alt="Logo" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)" }} />
        <div>
          <div style={{ fontSize:16, fontWeight:800, color:"#fff", lineHeight: 1 }}>GBI Sion <span style={{ color:"#E8541A" }}>Admin</span></div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>CMS Dashboard</div>
        </div>
      </div>

      <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
        {menu.map(m => (
          <NavLink key={m.to} to={m.to} end={m.to === "/admin"}
            onClick={onClose}
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
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{ROLE_LABELS[role] ?? role}</div>
          </div>
        </div>
        <button onClick={logout} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", width:"100%", background:"transparent", border:"none", cursor:"pointer", borderRadius:10, fontSize:14, color:"rgba(255,100,80,0.8)", fontFamily:"inherit", fontWeight:500, transition:"all 0.15s" }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  )
}
