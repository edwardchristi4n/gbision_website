import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, BookOpen } from "lucide-react"
import api from "@/lib/axios"

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  cover_url: string | null
  category: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  renungan: "Renungan",
  kesaksian: "Kesaksian",
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  renungan:  { bg: "#EFF6FF", text: "#1D4ED8" },
  kesaksian: { bg: "#F0FDF4", text: "#15803D" },
}

function formatDate(d: string | null) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    api.get(`/blog/${slug}`)
      .then(res => setPost(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Memuat artikel...
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <BookOpen size={48} color="#CBD5E1" />
        <p style={{ color: "#64748B", fontSize: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Artikel tidak ditemukan.</p>
        <Link to="/blog" style={{ color: "#E8541A", fontWeight: 600, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          ← Kembali ke Blog
        </Link>
      </div>
    )
  }

  const catColor = post.category ? CATEGORY_COLORS[post.category] : null

  return (
    <div style={{ background: "#FDF8F3", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Cover image */}
      {post.cover_url && (
        <div style={{ width: "100%", height: "clamp(280px, 40vw, 480px)", overflow: "hidden", background: "#0D2240" }}>
          <img
            src={post.cover_url}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
          />
        </div>
      )}

      {/* No cover — simple navy header */}
      {!post.cover_url && (
        <div style={{ background: "#0D2240", padding: "80px 24px 48px" }} />
      )}

      {/* Article content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "clamp(28px, 5vw, 56px)",
            marginTop: -40,
            boxShadow: "0 8px 40px rgba(13,34,64,.10)",
            border: "1px solid #E8EDF2",
          }}
        >
          {/* Back + meta */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <Link
              to="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748B", fontSize: 14, fontWeight: 500, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <ArrowLeft size={16} /> Kembali ke Blog
            </Link>

            {catColor && post.category && (
              <span style={{
                fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 99,
                background: catColor.bg, color: catColor.text,
                textTransform: "uppercase", letterSpacing: 0.5,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#0D2240", lineHeight: 1.25, marginBottom: 16 }}>
            {post.title}
          </h1>

          {/* Date */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94A3B8", fontSize: 13, marginBottom: 32, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <Calendar size={14} />
            {formatDate(post.published_at ?? post.created_at)}
          </div>

          {/* Excerpt / intro */}
          {post.excerpt && (
            <p style={{
              fontSize: 17, color: "#475569", lineHeight: 1.7, marginBottom: 32,
              paddingLeft: 16, borderLeft: "3px solid #E8541A",
              fontStyle: "italic", fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {post.excerpt}
            </p>
          )}

          <hr style={{ border: "none", borderTop: "1px solid #E8EDF2", marginBottom: 32 }} />

          {/* Content */}
          {post.content ? (
            <div
              style={{
                fontSize: 16,
                color: "#374151",
                lineHeight: 1.85,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {post.content}
            </div>
          ) : (
            <p style={{ color: "#94A3B8", fontStyle: "italic", textAlign: "center", padding: "32px 0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Konten belum tersedia.
            </p>
          )}

          {/* Footer */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #E8EDF2", textAlign: "center" }}>
            <Link
              to="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#E8541A", fontWeight: 600, fontSize: 14, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <ArrowLeft size={15} /> Lihat artikel lainnya
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
