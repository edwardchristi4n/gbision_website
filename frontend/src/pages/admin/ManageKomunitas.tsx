import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, Users2 } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"
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
  community: string | null
}

const COMMUNITY_ROLES: Record<string, string> = {
  admin_remaja:      "remaja",
  admin_pemuda:      "pemuda",
  admin_kaum_pria:   "kaum_pria",
  admin_kaum_wanita: "kaum_wanita",
}

const COMMUNITY_OPTIONS = [
  { value: "remaja",     label: "RBI SION (Remaja)" },
  { value: "pemuda",     label: "PBI SION (Pemuda)" },
  { value: "kaum_pria",  label: "Kaum Pria" },
  { value: "kaum_wanita",label: "Kaum Wanita" },
  { value: "pd_wilayah", label: "PD Wilayah" },
  { value: "ibadah_emas",label: "Ibadah Emas" },
]

const getCommunityLabel = (code: string | null) =>
  COMMUNITY_OPTIONS.find(c => c.value === code)?.label ?? code ?? "—"

export default function ManageKomunitas() {
  const { user } = useAuth()
  const role = user?.role ?? ""

  // Tentukan community berdasarkan role
  const isCommunityAdmin = role in COMMUNITY_ROLES
  const myCommunity = isCommunityAdmin ? COMMUNITY_ROLES[role] : null

  // Filter aktif (untuk admin/superadmin bisa pilih komunitas)
  const [selectedCommunity, setSelectedCommunity] = useState<string>(
    myCommunity ?? COMMUNITY_OPTIONS[0].value
  )

  const [items, setItems] = useState<ProgramItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  type DialogState = { open: boolean; title: string; message: string; confirmLabel: string; variant: "danger" | "primary"; onConfirm: () => void }
  const CLOSED: DialogState = { open: false, title: "", message: "", confirmLabel: "Lanjutkan", variant: "primary", onConfirm: () => {} }
  const [dialog, setDialog] = useState<DialogState>(CLOSED)

  const emptyForm = {
    title: "", description: "", schedule: "", location: "",
    image_url: "", is_active: true,
    community: myCommunity ?? COMMUNITY_OPTIONS[0].value,
  }
  const [formData, setFormData] = useState(emptyForm)

  const fetchItems = (comm: string) => {
    setLoading(true)
    api.get(`/programs?active_only=false&community=${comm}`)
      .then(res => setItems(res.data))
      .catch(() => toast.error("Gagal memuat data program."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchItems(selectedCommunity)
  }, [selectedCommunity])

  const handleEdit = (p: ProgramItem) => {
    setFormData({
      title: p.title,
      description: p.description || "",
      schedule: p.schedule || "",
      location: p.location || "",
      image_url: p.image_url || "",
      is_active: p.is_active,
      community: p.community ?? selectedCommunity,
    })
    setEditingId(p.id)
    setFormOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const snap = { ...formData }
    const id = editingId
    const comm = selectedCommunity
    setDialog({
      open: true,
      title: id ? "Simpan Perubahan?" : "Tambah Program Baru?",
      message: id
        ? "Yakin ingin menyimpan perubahan pada program ini?"
        : "Yakin ingin menambahkan program baru ini?",
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
          community:   isCommunityAdmin ? null : snap.community,
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
          setFormData({ ...emptyForm, community: comm })
          fetchItems(comm)
        } catch (err: any) {
          toast.error(err.response?.data?.detail || "Gagal menyimpan program.")
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
          fetchItems(selectedCommunity)
        } catch (err: any) {
          toast.error(err.response?.data?.detail || "Gagal menghapus.")
        }
      }
    })
  }

  const communityLabel = getCommunityLabel(selectedCommunity)

  return (
    <div>
      <ConfirmDialog {...dialog} onCancel={() => setDialog(CLOSED)} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kelola Komunitas</h1>
          <p className="text-slate-500 text-sm mt-1">
            {isCommunityAdmin
              ? `Kelola program & kegiatan ${communityLabel}`
              : "Kelola program & kegiatan komunitas gereja."}
          </p>
        </div>
        <button onClick={() => {
          setFormData({ ...emptyForm, community: selectedCommunity })
          setEditingId(null)
          setFormOpen(true)
        }} className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:opacity-90 transition font-medium">
          <Plus size={18} /> Tambah Program
        </button>
      </div>

      {/* Filter komunitas — hanya admin/superadmin */}
      {!isCommunityAdmin && (
        <div className="mb-6 flex flex-wrap gap-2">
          {COMMUNITY_OPTIONS.map(c => (
            <button
              key={c.value}
              onClick={() => setSelectedCommunity(c.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                selectedCommunity === c.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-slate-600 border-slate-300 hover:border-navy"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Judul komunitas aktif */}
      <div className="mb-4 flex items-center gap-2">
        <Users2 size={18} className="text-orange" />
        <span className="font-semibold text-navy">{communityLabel}</span>
        <span className="text-slate-400 text-sm">({items.length} program)</span>
      </div>

      {/* Form tambah/edit */}
      {formOpen && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-4">
            {editingId ? "Edit Program" : "Tambah Program Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pilih komunitas — hanya admin/superadmin */}
            {!isCommunityAdmin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Komunitas</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy bg-white"
                  value={formData.community}
                  onChange={e => setFormData({...formData, community: e.target.value})}
                >
                  {COMMUNITY_OPTIONS.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Program / Kegiatan</label>
              <input
                type="text" required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
              <textarea
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy min-h-[100px]"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jadwal (mis: Setiap Jumat, 18.30)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
                <input
                  type="text"
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
                className="w-4 h-4 text-orange" />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                Aktif (Ditampilkan di Website)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setFormOpen(false); setEditingId(null) }}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
                Batal
              </button>
              <button type="submit" className="px-5 py-2 bg-navy text-white rounded-lg hover:opacity-90 font-medium transition">
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List program */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Users2 size={24} />
          </div>
          <p className="text-slate-500">
            Belum ada program untuk komunitas ini. Klik "Tambah Program" untuk membuat.
          </p>
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
                  <Users2 size={32} />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-navy truncate">{item.title}</h3>
                  {!item.is_active && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold shrink-0 ml-1">
                      NONAKTIF
                    </span>
                  )}
                </div>
                {/* Label komunitas (hanya admin/superadmin) */}
                {!isCommunityAdmin && item.community && (
                  <span className="inline-block text-[10px] bg-orange/10 text-orange px-2 py-0.5 rounded font-semibold mb-2">
                    {getCommunityLabel(item.community)}
                  </span>
                )}
                <p className="text-xs text-slate-500 line-clamp-2 min-h-[2.5rem]">
                  {item.description || "Tidak ada deskripsi"}
                </p>
                {item.schedule && (
                  <p className="text-xs text-slate-400 mt-1">📅 {item.schedule}</p>
                )}
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
