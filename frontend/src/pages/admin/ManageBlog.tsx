import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, BookOpen, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/axios"
import ImageUpload from "@/components/forms/ImageUpload"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_url: string | null
  category: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = { renungan: "Renungan", kesaksian: "Kesaksian" }
const CATEGORY_COLORS: Record<string, string> = {
  renungan: "bg-blue-100 text-blue-700",
  kesaksian: "bg-green-100 text-green-700",
}

type DialogState = {
  open: boolean; title: string; message: string
  confirmLabel: string; variant: "danger" | "primary"
  onConfirm: () => void
}
const CLOSED: DialogState = { open: false, title: "", message: "", confirmLabel: "Lanjutkan", variant: "primary", onConfirm: () => {} }

export default function ManageBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")
  const [dialog, setDialog] = useState<DialogState>(CLOSED)

  const [form, setForm] = useState({
    title: "", category: "renungan", cover_url: "",
    excerpt: "", content: "", is_published: false,
  })

  const fetchPosts = () => {
    setLoading(true)
    api.get("/blog?published_only=false")
      .then(res => setPosts(res.data))
      .catch(() => toast.error("Gagal memuat data artikel."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchPosts() }, [])

  const openAdd = () => {
    setForm({ title: "", category: "renungan", cover_url: "", excerpt: "", content: "", is_published: false })
    setEditingId(null)
    setFormOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openEdit = (p: BlogPost) => {
    setForm({
      title: p.title, category: p.category ?? "renungan",
      cover_url: p.cover_url ?? "", excerpt: p.excerpt ?? "",
      content: p.content ?? "", is_published: p.is_published,
    })
    setEditingId(p.id)
    setFormOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const snap = { ...form }
    const id = editingId
    setDialog({
      open: true,
      title: id ? "Simpan Perubahan Artikel?" : "Terbitkan Artikel Baru?",
      message: id
        ? "Yakin ingin menyimpan perubahan pada artikel ini?"
        : snap.is_published
          ? "Artikel akan langsung terbit dan dapat dibaca jemaat."
          : "Artikel akan disimpan sebagai draft dan belum ditampilkan.",
      confirmLabel: "Simpan",
      variant: "primary",
      onConfirm: async () => {
        setDialog(CLOSED)
        const payload = {
          ...snap,
          cover_url: snap.cover_url || null,
          excerpt:   snap.excerpt   || null,
          content:   snap.content   || null,
          category:  snap.category  || null,
        }
        try {
          if (id) {
            await api.put(`/blog/${id}`, payload)
            toast.success("Artikel berhasil diperbarui!")
          } else {
            await api.post("/blog", payload)
            toast.success(snap.is_published ? "Artikel berhasil diterbitkan!" : "Draft artikel berhasil disimpan!")
          }
          setFormOpen(false)
          setEditingId(null)
          fetchPosts()
        } catch {
          toast.error("Gagal menyimpan artikel.")
        }
      }
    })
  }

  const handleDelete = (id: number) => {
    setDialog({
      open: true,
      title: "Hapus Artikel?",
      message: "Artikel ini akan dihapus permanen dan tidak bisa dikembalikan.",
      confirmLabel: "Hapus",
      variant: "danger",
      onConfirm: async () => {
        setDialog(CLOSED)
        try {
          await api.delete(`/blog/${id}`)
          toast.success("Artikel berhasil dihapus!")
          fetchPosts()
        } catch {
          toast.error("Gagal menghapus artikel.")
        }
      }
    })
  }

  const filtered = posts.filter(p => {
    if (statusFilter === "published") return p.is_published
    if (statusFilter === "draft") return !p.is_published
    return true
  })

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"

  return (
    <div>
      <ConfirmDialog {...dialog} onCancel={() => setDialog(CLOSED)} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kelola Blog</h1>
          <p className="text-slate-500 text-sm mt-1">Renungan dan kesaksian untuk jemaat.</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:opacity-90 transition font-medium">
          <Plus size={18} /> Tulis Artikel
        </button>
      </div>

      {/* Form Panel */}
      {formOpen && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-5">{editingId ? "Edit Artikel" : "Tulis Artikel Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Artikel</label>
              <input type="text" required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-navy text-base font-medium"
                placeholder="Judul artikel..."
                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Konten */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Konten Artikel</label>
                  <textarea required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-navy min-h-[320px] text-sm leading-relaxed resize-y"
                    placeholder="Tulis isi artikel di sini..."
                    value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ringkasan Singkat</label>
                  <textarea
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-navy min-h-[80px] text-sm resize-none"
                    placeholder="Ringkasan yang ditampilkan di halaman daftar..."
                    value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <select
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-navy bg-white text-sm"
                    value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="renungan">Renungan</option>
                    <option value="kesaksian">Kesaksian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Foto Cover (Opsional)</label>
                  {form.cover_url ? (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                      <img src={form.cover_url} alt="Cover" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setForm({ ...form, cover_url: "" })}
                        className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-lg shadow hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <ImageUpload folder="blog" onUpload={url => setForm({ ...form, cover_url: url })} />
                  )}
                </div>
                <div className="flex items-center gap-2 py-2 px-3 bg-slate-50 rounded-lg border border-slate-200">
                  <input type="checkbox" id="isPublished"
                    checked={form.is_published}
                    onChange={e => setForm({ ...form, is_published: e.target.checked })}
                    className="w-4 h-4 accent-orange" />
                  <label htmlFor="isPublished" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                    Terbitkan sekarang
                  </label>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => { setFormOpen(false); setEditingId(null) }}
                    className="flex-1 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-sm">
                    Batal
                  </button>
                  <button type="submit"
                    className="flex-1 py-2 bg-navy text-white rounded-lg hover:bg-navy-light font-medium transition text-sm">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "all",       label: `Semua (${posts.length})` },
          { key: "published", label: `Terbit (${posts.filter(p => p.is_published).length})` },
          { key: "draft",     label: `Draft (${posts.filter(p => !p.is_published).length})` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setStatusFilter(tab.key as typeof statusFilter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${statusFilter === tab.key ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Memuat data...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <BookOpen size={24} />
          </div>
          <p className="text-slate-500">Belum ada artikel. Klik "Tulis Artikel" untuk memulai.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition flex gap-4">
              <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                {post.cover_url ? (
                  <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <BookOpen size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {post.category && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                  )}
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${post.is_published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {post.is_published ? <><Eye size={10} /> Terbit</> : <><EyeOff size={10} /> Draft</>}
                  </span>
                </div>
                <h3 className="font-bold text-navy truncate text-base">{post.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{post.excerpt ?? "Tidak ada ringkasan"}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {post.is_published ? `Terbit: ${formatDate(post.published_at)}` : `Dibuat: ${formatDate(post.created_at)}`}
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(post)}
                  className="flex items-center gap-1.5 text-xs font-medium text-navy hover:text-orange transition px-3 py-1.5 rounded-lg hover:bg-slate-50">
                  <Edit size={13} /> Edit
                </button>
                <button onClick={() => handleDelete(post.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-red-50">
                  <Trash2 size={13} /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
