import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/axios"
import ImageUpload from "@/components/forms/ImageUpload"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

interface GalleryItem {
  id: number
  title: string
  image_url: string
  album: string
  created_at: string
}

type DialogState = {
  open: boolean; title: string; message: string
  confirmLabel: string; variant: "danger" | "primary"
  onConfirm: () => void
}
const CLOSED: DialogState = { open: false, title: "", message: "", confirmLabel: "Lanjutkan", variant: "primary", onConfirm: () => {} }

export default function ManageGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [dialog, setDialog] = useState<DialogState>(CLOSED)

  const [formData, setFormData] = useState({ title: "", album: "Ibadah Raya", image_url: "" })

  const fetchItems = () => {
    setLoading(true)
    api.get("/gallery")
      .then(res => setItems(res.data))
      .catch(() => toast.error("Gagal memuat data galeri."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchItems() }, [])

  const openAdd = () => {
    setFormData({ title: "", album: "Ibadah Raya", image_url: "" })
    setEditingId(null)
    setFormOpen(true)
  }

  const handleEdit = (item: GalleryItem) => {
    setFormData({ title: item.title, album: item.album, image_url: item.image_url })
    setEditingId(item.id)
    setFormOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image_url) { toast.warning("Harap unggah gambar terlebih dahulu!"); return }
    const snap = { ...formData }
    const id = editingId
    setDialog({
      open: true,
      title: id ? "Simpan Perubahan Foto?" : "Tambah Foto Baru?",
      message: id
        ? "Yakin ingin menyimpan perubahan pada foto ini?"
        : "Yakin ingin menambahkan foto ini ke galeri website?",
      confirmLabel: "Simpan",
      variant: "primary",
      onConfirm: async () => {
        setDialog(CLOSED)
        try {
          if (id) {
            await api.put(`/gallery/${id}`, snap)
            toast.success("Foto berhasil diperbarui!")
          } else {
            await api.post("/gallery", snap)
            toast.success("Foto berhasil ditambahkan!")
          }
          setFormOpen(false)
          setEditingId(null)
          setFormData({ title: "", album: "Ibadah Raya", image_url: "" })
          fetchItems()
        } catch {
          toast.error("Gagal menyimpan foto.")
        }
      }
    })
  }

  const handleDelete = (id: number) => {
    setDialog({
      open: true,
      title: "Hapus Foto?",
      message: "Foto ini akan dihapus permanen dari galeri dan tidak bisa dikembalikan.",
      confirmLabel: "Hapus",
      variant: "danger",
      onConfirm: async () => {
        setDialog(CLOSED)
        try {
          await api.delete(`/gallery/${id}`)
          toast.success("Foto berhasil dihapus!")
          fetchItems()
        } catch {
          toast.error("Gagal menghapus foto.")
        }
      }
    })
  }

  return (
    <div>
      <ConfirmDialog {...dialog} onCancel={() => setDialog(CLOSED)} />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kelola Galeri</h1>
          <p className="text-slate-500 text-sm mt-1">Tambahkan dokumentasi foto kegiatan gereja.</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:opacity-90 transition font-medium">
          <Plus size={18} /> Tambah Foto
        </button>
      </div>

      {formOpen && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-4">{editingId ? "Edit Foto" : "Tambah Foto Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul / Keterangan</label>
                <input type="text" required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  placeholder="Mis. Ibadah Raya Minggu Ke-2"
                  value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Album / Kategori</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy bg-white"
                  value={formData.album} onChange={e => setFormData({ ...formData, album: e.target.value })}
                >
                  <option value="Ibadah Raya">Ibadah Raya</option>
                  <option value="Youth & Remaja">Youth & Remaja</option>
                  <option value="Retreat">Retreat / Camp</option>
                  <option value="Natal & Paskah">Perayaan Besar</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
              {formData.image_url ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })}
                    className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-lg shadow hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <ImageUpload folder="gallery" onUpload={url => setFormData({ ...formData, image_url: url })} />
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setFormOpen(false); setEditingId(null) }}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
                Batal
              </button>
              <button type="submit"
                className="px-5 py-2 bg-navy text-white rounded-lg hover:bg-navy-light font-medium transition">
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <ImageIcon size={24} />
          </div>
          <p className="text-slate-500">Belum ada foto. Klik "Tambah Foto" untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="w-full h-48 overflow-hidden bg-slate-100 relative">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
                  <button onClick={() => handleEdit(item)}
                    className="p-2 bg-white text-navy rounded-lg shadow-lg hover:bg-slate-50" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white text-red-500 rounded-lg shadow-lg hover:bg-red-50" title="Hapus">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-bold text-orange uppercase tracking-wider">{item.album}</span>
                <h3 className="font-bold text-navy mt-1 truncate">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
