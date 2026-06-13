// Card komponen untuk menampilkan satu program gereja
// Digunakan di halaman Home (preview) dan halaman Program (grid lengkap)
import type { Program } from '@/types'
import { truncate } from '@/lib/utils'

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
      {program.image_url && (
        <img src={program.image_url} alt={program.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-5">
        <h3 className="font-semibold text-navy text-lg">{program.title}</h3>
        <p className="text-slate-500 text-sm mt-1">{truncate(program.description, 100)}</p>
        <div className="mt-3 text-xs text-gold font-medium">{program.schedule} · {program.location}</div>
      </div>
    </div>
  )
}
