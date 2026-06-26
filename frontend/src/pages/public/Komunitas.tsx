import { motion } from "framer-motion"
import { NavLink } from "react-router-dom"
import { Users, Heart, Star, Shield, Sun, Coffee } from "lucide-react"

const KOMUNITAS_DATA = [
  { id: "rbi-sion", label: "RBI SION", desc: "Remaja Bethel Indonesia. Wadah pertumbuhan rohani untuk usia remaja.", icon: <Star size={24} color="#E8541A" /> },
  { id: "pbi-sion", label: "PBI SION", desc: "Pemuda Bethel Indonesia. Komunitas generasi muda yang bergerak dalam misi.", icon: <Sun size={24} color="#E8541A" /> },
  { id: "kaum-pria", label: "Kaum Pria", desc: "Menjadi teladan keluarga dan pemimpin yang berintegritas di dalam Tuhan.", icon: <Shield size={24} color="#E8541A" /> },
  { id: "kaum-wanita", label: "Kaum Wanita", desc: "Wanita-wanita Allah yang saling menguatkan, mendukung, dan melayani.", icon: <Heart size={24} color="#E8541A" /> },
  { id: "pd-wilayah", label: "PD Wilayah", desc: "Persekutuan Doa berdasarkan area tempat tinggal untuk mempererat kebersamaan.", icon: <Users size={24} color="#E8541A" /> },
  { id: "ibadah-umas", label: "Ibadah Umas", desc: "Pelayanan khusus bagi usia emas (lansia) agar terus berbuah di masa tua.", icon: <Coffee size={24} color="#E8541A" /> },
]

export default function Komunitas() {
  return (
    <div style={{ background: "#FDF8F3", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-tag"
            style={{ justifyContent: "center" }}
          >
            Bertumbuh Bersama
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}
          >
            Komunitas <span style={{ color: "#E8541A" }}>Sion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}
          >
            Di GBI Sion Karawang, kami percaya pertumbuhan rohani sejati terjadi dalam komunitas. Temukan kelompok yang sesuai dengan musim hidup Anda saat ini.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="page-section">
        <div className="page-inner" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24
        }}>
          {KOMUNITAS_DATA.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #E8EDF2",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{
                  width: 56, height: 56, borderRadius: 12, background: "#FFF3EE",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20
              }}>
                 {item.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0D2240", marginBottom: 12 }}>
                {item.label}
              </h3>
              <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.6, marginBottom: 24, flexGrow: 1 }}>
                {item.desc}
              </p>
              <NavLink to={`/komunitas/${item.id}`} style={{ textDecoration: "none", marginTop: "auto" }}>
                <span style={{ color: "#E8541A", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  Pelajari Lebih Lanjut →
                </span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
