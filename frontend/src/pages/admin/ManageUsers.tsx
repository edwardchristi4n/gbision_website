import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, ShieldAlert, Users as UsersIcon } from "lucide-react"
import api from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"

interface UserItem {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

const ROLE_LABELS: Record<string, string> = {
  superadmin:        "Super Admin",
  admin:             "Admin",
  admin_remaja:      "Admin Remaja",
  admin_pemuda:      "Admin Pemuda",
  admin_kaum_pria:   "Admin Kaum Pria",
  admin_kaum_wanita: "Admin Kaum Wanita",
}

const ROLE_BADGE: Record<string, string> = {
  superadmin:        "bg-orange/10 text-orange",
  admin:             "bg-blue-100 text-blue-700",
  admin_remaja:      "bg-green-100 text-green-700",
  admin_pemuda:      "bg-purple-100 text-purple-700",
  admin_kaum_pria:   "bg-sky-100 text-sky-700",
  admin_kaum_wanita: "bg-pink-100 text-pink-700",
}

// Role yang bisa dipilih oleh masing-masing level admin
const SUPERADMIN_ROLES = ["superadmin", "admin", "admin_remaja", "admin_pemuda", "admin_kaum_pria", "admin_kaum_wanita"]
const ADMIN_ROLES      = ["admin_remaja", "admin_pemuda", "admin_kaum_pria", "admin_kaum_wanita"]

export default function ManageUsers() {
  const { user, isLoading: authLoading } = useAuth()
  const [items, setItems] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "admin_remaja"
  })

  const isUserManager = user?.role === "superadmin" || user?.role === "admin"
  const availableRoles = user?.role === "superadmin" ? SUPERADMIN_ROLES : ADMIN_ROLES

  const fetchItems = () => {
    setLoading(true)
    api.get("/admin/users")
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (authLoading) return
    if (isUserManager) {
      fetchItems()
    } else {
      setLoading(false)
    }
  }, [user, authLoading])

  if (authLoading) {
    return <div className="text-center py-12 text-slate-500">Memuat...</div>
  }

  if (!isUserManager) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert size={64} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-navy mb-2">Akses Ditolak</h2>
        <p className="text-slate-500">Hanya Admin atau Super Admin yang dapat mengakses halaman ini.</p>
      </div>
    )
  }

  const handleEdit = (p: UserItem) => {
    setFormData({ name: p.name, email: p.email, password: "", role: p.role })
    setEditingId(p.id)
    setFormOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const payload = formData.password
          ? formData
          : { name: formData.name, email: formData.email, role: formData.role }
        await api.put(`/admin/users/${editingId}`, payload)
      } else {
        if (!formData.password) return alert("Password wajib diisi untuk akun baru!")
        await api.post("/admin/users", formData)
      }
      setFormOpen(false)
      setEditingId(null)
      setFormData({ name: "", email: "", password: "", role: "admin_remaja" })
      fetchItems()
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.detail || "Gagal menyimpan user.")
    }
  }

  const handleDelete = async (id: number) => {
    if (id === user!.id) return alert("Anda tidak bisa menghapus akun Anda sendiri!")
    if (!confirm("Yakin ingin menghapus akun ini secara permanen?")) return
    try {
      await api.delete(`/admin/users/${id}`)
      fetchItems()
    } catch (err: any) {
      alert(err.response?.data?.detail || "Gagal menghapus.")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Manajemen User</h1>
          <p className="text-slate-500 text-sm mt-1">
            {user?.role === "superadmin"
              ? "Buat & kelola semua akun admin CMS."
              : "Buat & kelola akun admin komunitas (Remaja, Pemuda, Kaum Pria, Kaum Wanita)."}
          </p>
        </div>
        <button onClick={() => {
          setFormData({ name: "", email: "", password: "", role: availableRoles[0] })
          setEditingId(null)
          setFormOpen(true)
        }} className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:opacity-90 transition font-medium">
          <Plus size={18} /> Akun Baru
        </button>
      </div>

      {formOpen && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-4">{editingId ? "Edit Akun" : "Buat Akun Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text" required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email / Username</label>
                <input
                  type="email" required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password {editingId && <span className="text-slate-400 text-xs font-normal">(Kosongkan jika tidak diubah)</span>}
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy"
                  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hak Akses (Role)</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy bg-white"
                  value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  {availableRoles.map(r => (
                    <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => { setFormOpen(false); setEditingId(null) }}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
                Batal
              </button>
              <button type="submit" className="px-5 py-2 bg-navy text-white rounded-lg hover:opacity-90 font-medium transition">
                Simpan Akun
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Keterangan hak akses tiap role */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
        <p className="font-semibold mb-1">Keterangan Hak Akses:</p>
        <ul className="space-y-0.5 text-xs">
          {user?.role === "superadmin" && <>
            <li><span className="font-medium">Super Admin</span> — Akses penuh ke seluruh CMS + manajemen semua user</li>
            <li><span className="font-medium">Admin</span> — Akses penuh ke seluruh CMS + buat/kelola akun komunitas</li>
          </>}
          <li><span className="font-medium">Admin Remaja</span> — Kelola program &amp; kegiatan komunitas RBI SION (Remaja)</li>
          <li><span className="font-medium">Admin Pemuda</span> — Kelola program &amp; kegiatan komunitas PBI SION (Pemuda)</li>
          <li><span className="font-medium">Admin Kaum Pria</span> — Kelola program &amp; kegiatan komunitas Kaum Pria</li>
          <li><span className="font-medium">Admin Kaum Wanita</span> — Kelola program &amp; kegiatan komunitas Kaum Wanita</li>
        </ul>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Memuat data...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <UsersIcon size={24} />
          </div>
          <p className="text-slate-500">Belum ada akun lain terdaftar.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                <th className="p-4 font-semibold">Nama</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Hak Akses</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-navy">{item.name}</td>
                  <td className="p-4 text-slate-600">{item.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${ROLE_BADGE[item.role] ?? "bg-slate-100 text-slate-600"}`}>
                      {ROLE_LABELS[item.role] ?? item.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleEdit(item)} className="text-slate-400 hover:text-navy transition" title="Edit">
                        <Edit size={16} />
                      </button>
                      {item.id !== user?.id && (
                        <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500 transition" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
