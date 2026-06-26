import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { Menu } from "lucide-react"

export default function AdminLayout() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 99, display: "block"
          }}
        />
      )}

      {/* Sidebar — fixed on mobile, normal on desktop */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: "100%", zIndex: 100,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
      }} className="admin-sidebar-mobile">
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="admin-sidebar-desktop">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <header style={{
          height: 56, background: "#fff", borderBottom: "1px solid #E8EDF2",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Hamburger — visible only on mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="admin-menu-btn"
              style={{ background: "none", border: "1px solid #E8EDF2", borderRadius: 8, cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center", color: "#0D2240" }}
              aria-label="Buka menu"
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: 13, color: "#64748B" }}>
              Selamat datang, <span style={{ color: "#0D2240", fontWeight: 600 }}>{user?.name ?? "Admin"}</span> 👋
            </div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#E8541A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>
            {user?.name?.charAt(0) ?? "A"}
          </div>
        </header>
        <main style={{ flex: 1, overflowY: "auto", background: "#F8FAFC", padding: 24 }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-sidebar-mobile { display: none; }
        .admin-sidebar-desktop { display: flex; flex-shrink: 0; }
        .admin-menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .admin-sidebar-mobile { display: block; }
          .admin-sidebar-desktop { display: none; }
          .admin-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
