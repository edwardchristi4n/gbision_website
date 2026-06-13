import { NavLink } from "react-router-dom"

const navLinks = [
  { to: "/",          label: "Beranda" },
  { to: "/tentang",   label: "Tentang Kami" },
  { to: "/program",   label: "Program" },
  { to: "/jadwal",    label: "Jadwal Ibadah" },
]

const contentLinks = [
  { to: "/blog",         label: "Blog & Renungan" },
  { to: "/galeri",       label: "Galeri" },
  { to: "/pengumuman",   label: "Pengumuman" },
  { to: "/pendeta",      label: "Pendeta" },
]

const socials = [
  { id: "ig", label: "Instagram", icon: "IG" },
  { id: "yt", label: "YouTube",   icon: "YT" },
  { id: "wa", label: "WhatsApp",  icon: "WA" },
  { id: "fb", label: "Facebook",  icon: "FB" },
]

export default function Footer() {
  return (
    <footer style={{ background: "#0D2240", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        .footer-link {
          display: block;
          font-size: 14px;
          color: #64748B;
          text-decoration: none;
          margin-bottom: 9px;
          transition: color .2s;
        }
        .footer-link:hover { color: #fff; }

        .footer-social {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #fff;
          cursor: pointer; transition: all .2s;
        }
        .footer-social:hover { background: #E8541A; border-color: #E8541A; }

        @media (max-width: 768px) {
          .footer-brand-col { grid-column: 1 / -1; }
        }
      `}</style>

      {/* Main */}
      <div style={{ padding: "60px 48px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,.08)" }}>

            {/* Brand column */}
            <div className="footer-brand-col">
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 14, color: "#fff" }}>
                  GBI Sion <span style={{ color: "#E8541A" }}>Karawang</span>
                </div>
              </NavLink>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75, marginBottom: 20, maxWidth: 260 }}>
                Gereja yang mengasihi Tuhan dan melayani sesama. Bergabunglah bersama keluarga besar kami.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {socials.map(s => (
                  <div key={s.id} className="footer-social" title={s.label}>{s.icon}</div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h5 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
                Navigasi
              </h5>
              {navLinks.map(l => (
                <NavLink key={l.to} to={l.to} className="footer-link">{l.label}</NavLink>
              ))}
            </div>

            {/* Content */}
            <div>
              <h5 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
                Konten
              </h5>
              {contentLinks.map(l => (
                <NavLink key={l.to} to={l.to} className="footer-link">{l.label}</NavLink>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h5 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
                Kontak
              </h5>
              {[
                "Jl. Contoh No.123, Karawang",
                "+62 812 3456 7890",
                "info@gbision.org",
              ].map(item => (
                <p key={item} style={{ fontSize: 14, color: "#64748B", marginBottom: 8, lineHeight: 1.6 }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#475569" }}>
              © 2025 GBI Sion Karawang. All rights reserved.
            </span>
            <NavLink to="/kontak" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}>
                Hubungi Kami →
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
