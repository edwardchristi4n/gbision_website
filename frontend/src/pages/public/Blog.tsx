import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"
import api from "@/lib/axios"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  cover_url: string | null
  category: string | null
  published_at: string | null
  created_at: string
}

const CATEGORIES = [
  { key: "all",       label: "Semua" },
  { key: "renungan",  label: "Renungan" },
  { key: "kesaksian", label: "Kesaksian" },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  renungan:  { bg: "#EFF6FF", text: "#1D4ED8" },
  kesaksian: { bg: "#F0FDF4", text: "#15803D" },
}

function formatDate(d: string | null) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    api.get("/blog?published_only=true")
      .then(res => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter(p => p.category === activeCategory)

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
            Firman & Inspirasi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}
          >
            Blog <span style={{ color: "#E8541A" }}>GBI Sion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}
          >
            Renungan harian dan kesaksian iman dari keluarga besar GBI Sion Karawang.
          </motion.p>
        </div>
      </div>

      <div className="page-section">
        <div className="page-inner">
          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "all 0.2s",
                  background: activeCategory === cat.key ? "#0D2240" : "#fff",
                  color: activeCategory === cat.key ? "#fff" : "#64748B",
                  boxShadow: activeCategory === cat.key ? "none" : "0 1px 4px rgba(0,0,0,0.08)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#64748B" }}>Memuat artikel...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#94A3B8" }}>
                <BookOpen size={24} />
              </div>
              <p style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Belum ada artikel untuk kategori ini.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}>
              {filtered.map((post, i) => {
                const catColor = post.category ? CATEGORY_COLORS[post.category] : null
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(13,34,64,.05)",
                      border: "1px solid #E8EDF2",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Cover */}
                    <div style={{ width: "100%", height: 220, overflow: "hidden", background: "#F1F5F9", flexShrink: 0 }}>
                      {post.cover_url ? (
                        <img
                          src={post.cover_url}
                          alt={post.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                          loading="lazy"
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#CBD5E1" }}>
                          <BookOpen size={32} />
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        {catColor && post.category && (
                          <span style={{
                            fontSize: 11, fontWeight: 700, padding: "3px 10px",
                            borderRadius: 99, background: catColor.bg, color: catColor.text,
                            textTransform: "uppercase", letterSpacing: 0.5,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}>
                            {post.category === "renungan" ? "Renungan" : "Kesaksian"}
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {formatDate(post.published_at ?? post.created_at)}
                        </span>
                      </div>

                      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0D2240", marginBottom: 8, lineHeight: 1.35 }}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {post.excerpt}
                        </p>
                      )}

                      <Link
                        to={`/blog/${post.slug}`}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          color: "#E8541A", fontWeight: 600, fontSize: 14,
                          textDecoration: "none", marginTop: "auto",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          transition: "gap 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
                        onMouseLeave={e => (e.currentTarget.style.gap = "6px")}
                      >
                        Baca Selengkapnya <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
