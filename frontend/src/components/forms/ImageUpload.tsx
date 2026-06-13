// Komponen upload gambar — drag & drop atau click, preview sebelum submit
// Kirim file ke backend via multipart/form-data menggunakan axios
export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const handleFile = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    // TODO: POST ke /api/upload, response { url: '...' }
    console.log('upload:', file.name)
  }
  return (
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-navy transition">
      <span className="text-sm text-slate-400">Klik atau drag gambar ke sini</span>
      <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
    </label>
  )
}
