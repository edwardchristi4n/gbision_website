import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import api from "@/lib/axios"

interface GalleryItem {
  id: number
  title: string | null
  image_url: string
  album: string | null
  created_at: string
}

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    api.get("/gallery")
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Failed to load gallery", err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading && photos.length > 0) {
      let ctx = gsap.context(() => {
        gsap.from(".gallery-item", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        })
      }, containerRef)
      return () => ctx.revert()
    }
  }, [loading, photos])

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
            Dokumentasi Kegiatan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}
          >
            Galeri <span style={{ color: "#E8541A" }}>GBI Sion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}
          >
            Kilas balik momen kebersamaan, ibadah, dan pelayanan kita sebagai satu keluarga di dalam Tuhan.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="page-section" ref={containerRef}>
        <div className="page-inner">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#64748B" }}>
              Memuat foto...
            </div>
          ) : photos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#64748B" }}>
              Belum ada foto kegiatan.
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24
            }}>
              {photos.map(p => (
                <div key={p.id} className="gallery-item" style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(13,34,64,.05)",
                  border: "1px solid #E8EDF2"
                }}>
                  <div style={{ width: "100%", height: 260, overflow: "hidden" }}>
                    <img 
                      src={p.image_url} 
                      alt={p.title || "Gallery photo"} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    {p.album && (
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#E8541A", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, display: "block" }}>
                        {p.album}
                      </span>
                    )}
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0D2240", margin: 0 }}>
                      {p.title || "Momen Kegiatan"}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}