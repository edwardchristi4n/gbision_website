import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, Church } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/axios"
import ImageUpload from "@/components/forms/ImageUpload"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

interface ProgramItem {
  id: number
  title: string
  description: string | null
  schedule: string | null
  location: string | null
  image_url: string | null
  is_active: boolean
}

type DialogState = {
  open: boolean; title: string; message: string
  confirmLabel: string; variant: "danger" | "primary"
  onConfirm: () => void
}
const CLOSED: DialogState = { open: false, title: "", message: "", confirmLabel: "Lanjutkan", variant: "primary", onConfirm: () => {} }

export default function ManagePrograms() {
  const [items, setItems] = useState<ProgramItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [dialog, setDialog] = useState<DialogState>(CLOSED)

  const [formData, setFormData] = useState({
    title: "", description: "", schedule: "", location: "", image_url: "", is_active: true
  })

  const fetchItems = () => {
    setLoading(true)
    api.get("/programs?active_only=false&community=general")
      .then(res => setItems(res.data))
      .catch(() => toast.error("Gagal memuat data program."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchItems() }, [])

  const handleEdit = (p: ProgramItem) => {
    setFormData({
      title: p.title, description: p.description || "",
      schedule: p.schedule || "", location: p.location || "",
      image_url: p.image_url || "", is_active: p.is_active
    })
    setEditingId(p.id)
    setFormOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const snap = { ...formData }
    const id = editingId
    setDialog({
      open: true,
      title: id ? "Simpan Perubahan?" : "Tambah Program Baru?",
      message: id
        ? "Yakin ingin menyimpan perubahan pada program ini?"
        : "Yakin ingin menambahkan program baru ini ke website?",
      confirmLabel: "Simpan",
      variant: "primary",
      onConfirm: async () => {
        setDialog(CLOSED)
        const payload = {
          ...snap,
          description: snap.description || null,
          schedule:    snap.schedule    || null,
          location:    snap.location    || null,
          image_url:   snap.image_url   || null,
        }
        try {
          if (id) {
            await api.put(`/programs/${id}`, payload)
            toast.success("Program berhasil diperbarui!")
          } else {
            await api.post("/programs", payload)
            toast.success("Program berhasil ditambahkan!")
          }
          setFormOpen(false)
          setEditingId(null)
          setFormData({ title: "", description: "", schedule: "", location: "", image_url: "", is_active: true })
          fetchItems()
        } catch {
          toast.error("Gagal menyimpan program.")
        }
      }
    })
  }

  const handleDelete = (id: number) => {
    setDialog({
      open: true,
      title: "Hapus Program?",
      message: "Program ini akan dihapus permanen dan tidak bisa dikembalikan.",
      confirmLabel: "Hapus",
      variant: "danger",
      onConfirm: async () => {
        setDialog(CLOSED)
        try {
          await api.delete(`/programs/${id}`)
          toast.success("Program berhasil dihapus!")
          fetchItems()
        } catch {
          toast.error("Gagal menghapus program.")
        }
      }
    })
  }

  return (
    <div>
      <ConfirmDialog {...dialog} onCancel={() => setDialog(CLOSED)} />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kelola Program</h1>
          <p className="text-slate-500 text-sm mt-1">Atur jadwal, deskripsi, dan gambar pelayanan.</p>
        </div>
        <button onClick={() => {
          setFormData({ title: "", description: "", schedule: "", location: "", image_url: "", is_active: true })
          setEditingId(null)
          setFormOpen(true)
        }} className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:opacity-90 transition font-medium">
          <Plus size={18} /> Tambah Program
        </button>
      </div>

      {formOpen && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-4">{editingId ? "Edit Program" : "Tambah Program Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Program</label>
              <input type="text" required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
              <textarea
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy min-h-[100px]"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jadwal</label>
                <input type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  placeholder="Mis. Setiap Minggu, 10.00"
                  value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
                <input type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gambar/Banner (Opsional)</label>
              {formData.image_url ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setFormData({...formData, image_url: ""})}
                    className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-lg shadow hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <ImageUpload folder="programs" onUpload={url => setFormData({...formData, image_url: url})} />
              )}
            </div>
            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="isActive" checked={formData.is_active}
                onChange={e => setFormData({...formData, is_active: e.target.checked})}
                className="w-4 h-4 accent-orange" />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                Program Aktif (Ditampilkan di Website)
              </label>
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
            <Church size={24} />
          </div>
          <p className="text-slate-500">Belum ada program pelayanan. Klik "Tambah Program" untuk membuat baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className={`bg-white border ${item.is_active ? "border-slate-200" : "border-red-200 opacity-60"} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition`}>
              {item.image_url ? (
                <div className="w-full h-40 overflow-hidden bg-slate-100">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-40 bg-slate-50 flex items-center justify-center border-b border-slate-100 text-slate-400">
                  <Church size={32} />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-navy truncate">{item.title}</h3>
                  {!item.is_active && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">TIDAK AKTIF</span>}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 min-h-[2.5rem]">{item.description || "Tidak ada deskripsi"}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <button onClick={() => handleEdit(item)}
                    className="text-sm font-medium text-navy hover:text-orange flex items-center gap-1 transition">
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1 transition">
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
