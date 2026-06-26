// Komponen upload gambar — drag & drop atau click, preview sebelum submit
// Kirim file ke backend via multipart/form-data menggunakan axios
import api from '@/lib/axios'
import { useState } from 'react'

export default function ImageUpload({ onUpload, folder = 'misc' }: { onUpload: (url: string) => void, folder?: string }) {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('folder', folder)
      
      const res = await api.post('/upload/image', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      if (res.data && res.data.url) {
        let fullUrl = res.data.url
        if (!fullUrl.startsWith('http')) {
            const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'
            const serverBase = apiBase.replace(/\/api\/?$/, '')
            fullUrl = `${serverBase}${fullUrl}`
        }
        onUpload(fullUrl)
      }
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Gagal mengunggah gambar.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-navy transition relative">
      {uploading ? (
        <span className="text-sm text-slate-500 font-medium">Mengunggah...</span>
      ) : (
        <>
          <span className="text-sm text-slate-400">Klik atau drag gambar ke sini</span>
          <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </>
      )}
    </label>
  )
}
