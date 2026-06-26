import { useParams, Navigate, NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

const KOMUNITAS_INFO: Record<string, { title: string; subtitle: string; body: string }> = {
  "rbi-sion": {
    title: "RBI SION",
    subtitle: "Remaja Bethel Indonesia",
    body: "RBI Sion adalah wadah bagi para remaja (usia SMP hingga SMA) untuk menemukan jati diri mereka di dalam Kristus. Kami memiliki ibadah khusus remaja yang dinamis, fun, dan relevan dengan tantangan masa muda saat ini."
  },
  "pbi-sion": {
    title: "PBI SION",
    subtitle: "Pemuda Bethel Indonesia",
    body: "PBI Sion memfasilitasi generasi muda (mahasiswa dan profesional muda) untuk bertumbuh dalam iman, membangun relasi yang sehat, dan berdampak di dunia sekuler. Bergabunglah dalam fellowship dan proyek misi kami."
  },
  "kaum-pria": {
    title: "Kaum Pria",
    subtitle: "Men of Valor",
    body: "Komunitas Kaum Pria dibentuk untuk melengkapi para pria menjadi imam keluarga, teladan, dan pemimpin yang tangguh secara rohani maupun jasmani di tengah masyarakat."
  },
  "kaum-wanita": {
    title: "Kaum Wanita",
    subtitle: "Women of Grace",
    body: "Wadah bagi para wanita, ibu rumah tangga, maupun wanita karir untuk saling membagikan beban, berdoa bersama, dan bertumbuh menjadi wanita Allah yang cakap dan penuh kasih."
  },
  "pd-wilayah": {
    title: "Persekutuan Doa Wilayah",
    subtitle: "Komunitas Sel Dekat Rumah",
    body: "Kami membagi komunitas berdasarkan area tempat tinggal di sekitar Karawang. Di PD Wilayah, jemaat bisa mengalami keintiman keluarga rohani yang saling menjaga dan memperhatikan satu sama lain."
  },
  "ibadah-umas": {
    title: "Ibadah Umas",
    subtitle: "Usia Emas (Lansia)",
    body: "Sebuah pelayanan khusus yang didedikasikan untuk opa dan oma. Kami percaya bahwa di masa tua pun mereka akan tetap berbuah, segar, dan hijau di pelataran bait Allah."
  }
}

export default function KomunitasDetail() {
  const { id } = useParams<{ id: string }>()
  
  if (!id || !KOMUNITAS_INFO[id]) {
    return <Navigate to="/komunitas" replace />
  }

  const data = KOMUNITAS_INFO[id]

  return (
    <div style={{ background: "#FDF8F3", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="page-hero" style={{ paddingBottom: 64 }}>
        <div className="page-hero-inner text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-tag"
            style={{ justifyContent: "center" }}
          >
            {data.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}
          >
            {data.title}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div className="page-section">
        <div className="page-inner" style={{ maxWidth: 800 }}>
          <NavLink to="/komunitas" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#64748B", textDecoration: "none", marginBottom: 32, fontWeight: 600 }}>
            <ArrowLeft size={18} /> Kembali ke Komunitas
          </NavLink>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "48px",
              boxShadow: "0 12px 48px rgba(13,34,64,.06)",
              border: "1px solid #E8EDF2"
            }}
          >
            {/* Image Placeholder */}
            <div style={{
              width: "100%", height: 320, borderRadius: 16, background: "#F1F5F9", marginBottom: 32,
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
            }}>
              <span style={{ color: "#94A3B8" }}>[ Tempat Foto/Video {data.title} ]</span>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0D2240", marginBottom: 20 }}>
              Tentang {data.title}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#475569", marginBottom: 32 }}>
              {data.body}
            </p>

            <div style={{ padding: 24, background: "#FFF3EE", borderRadius: 16, borderLeft: "4px solid #E8541A" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0D2240", marginBottom: 8 }}>Ingin bergabung?</h3>
              <p style={{ color: "#64748B", fontSize: 15, marginBottom: 16 }}>
                Hubungi sekretariat gereja atau kunjungi jadwal ibadah kami untuk informasi selengkapnya mengenai jadwal kegiatan {data.title}.
              </p>
              <NavLink to="/kontak" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ padding: "10px 20px" }}>Hubungi Kami</button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
