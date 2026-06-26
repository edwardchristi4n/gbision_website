import { Clock } from "lucide-react"

export default function ManageSchedule() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-4">
        <Clock size={28} />
      </div>
      <h2 className="text-xl font-bold text-navy mb-2">Kelola Jadwal Ibadah</h2>
      <p className="text-slate-500 text-sm max-w-xs">Fitur ini sedang dalam pengembangan dan akan segera tersedia.</p>
    </div>
  )
}
