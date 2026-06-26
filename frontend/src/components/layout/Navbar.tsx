import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import logo from "@/assets/images/logo.jpg"

const links = [
  { to: "/tentang", label: "Tentang" },
  { to: "/program", label: "Program" },
]

const links2 = [
  { to: "/jadwal", label: "Jadwal" },
  { to: "/galeri", label: "Galeri" },
  { to: "/blog", label: "Blog" },
  { to: "/kontak", label: "Kontak" },
]

const sublinks = [
  { id: "rbi-sion", label: "RBI SION" },
  { id: "pbi-sion", label: "PBI SION" },
  { id: "kaum-pria", label: "Kaum Pria" },
  { id: "kaum-wanita", label: "Kaum Wanita" },
  { id: "pd-wilayah", label: "PD Wilayah" },
  { id: "ibadah-umas", label: "Ibadah Umas" }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [])

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 200,
      background: "#fff",
      borderBottom: "1px solid #E8EDF2",
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      transition: "box-shadow 0.35s ease",
      boxShadow: scrolled ? "0 4px 32px rgba(13,34,64,.08)" : "none",
    }}>
      {/* ── Main bar ── */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 32px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>
        {/* Brand */}
        <NavLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <img
            src={logo}
            alt="Logo GBI Sion Karawang"
            style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid #E8EDF2", flexShrink: 0 }}
          />
          <span style={{ fontSize: 17, fontWeight: 800, color: "#0D2240", letterSpacing: -0.5, lineHeight: 1 }}>
            GBI Sion <span style={{ color: "#E8541A" }}>Karawang</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {l.label}
            </NavLink>
          ))}

          {/* Komunitas Dropdown */}
          <div className="nav-dropdown-container" style={{ position: "relative" }}>
            <NavLink to="/komunitas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              Komunitas <ChevronDown size={14} />
            </NavLink>
            <div className="nav-dropdown-menu" style={{
              position: "absolute",
              top: "100%",
              left: -16,
              paddingTop: 16,
              width: 200,
              opacity: 0,
              visibility: "hidden",
              pointerEvents: "none",
              transform: "translateY(10px)",
              transition: "all 0.3s ease"
            }}>
              <div style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(13,34,64,.12)",
                padding: "8px 0",
                border: "1px solid #E8EDF2"
              }}>
                {sublinks.map(c => (
                  <NavLink key={c.id} to={`/komunitas/${c.id}`} className="dropdown-item" style={{
                    display: "block",
                    padding: "10px 20px",
                    fontSize: 14,
                    color: "#444",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s"
                  }}>
                    {c.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {links2.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <NavLink to="/jadwal" style={{ textDecoration: "none" }} className="navbar-cta">
            <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
              Gabung Ibadah →
            </button>
          </NavLink>
          <button
            onClick={() => setOpen(o => !o)}
            className="hamburger-btn"
            style={{ background: "none", border: "1px solid #E8EDF2", borderRadius: 8, cursor: "pointer", color: "#0D2240", padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div style={{
        overflowY: "auto",
        maxHeight: open ? "calc(100vh - 68px)" : 0,
        transition: "max-height 0.38s cubic-bezier(.16,1,.3,1)",
        borderTop: open ? "1px solid #E8EDF2" : "none",
        background: "#fff",
      }}>
        <div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                color: isActive ? "#E8541A" : "#1a1a1a",
                padding: "11px 4px",
                borderBottom: "1px solid #F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              })}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8541A" }} />}
                </>
              )}
            </NavLink>
          ))}

          {/* Mobile Komunitas Dropdown */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NavLink
              to="/komunitas"
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                color: isActive ? "#E8541A" : "#1a1a1a",
                padding: "11px 4px",
                borderBottom: "1px solid #F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              })}
            >
              {({ isActive }) => (
                <>
                  Komunitas
                  {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8541A" }} />}
                </>
              )}
            </NavLink>
            <div style={{ paddingLeft: 16, borderLeft: "2px solid #F5F5F5", marginLeft: 8, display: "flex", flexDirection: "column", marginTop: 4, marginBottom: 8 }}>
              {sublinks.map(c => (
                <NavLink key={c.id} to={`/komunitas/${c.id}`} onClick={() => setOpen(false)} style={{ padding: "8px 12px", fontSize: 14, color: "#666", textDecoration: "none" }}>
                  {c.label}
                </NavLink>
              ))}
            </div>
          </div>

          {links2.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                color: isActive ? "#E8541A" : "#1a1a1a",
                padding: "11px 4px",
                borderBottom: "1px solid #F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              })}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8541A" }} />}
                </>
              )}
            </NavLink>
          ))}
          <NavLink to="/jadwal" onClick={() => setOpen(false)} style={{ textDecoration: "none", marginTop: 12 }}>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}>
              Gabung Ibadah →
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
