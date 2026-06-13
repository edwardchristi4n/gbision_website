// Card komponen untuk profil pendeta
import type { Pastor } from '@/types'

export default function PastorCard({ pastor }: { pastor: Pastor }) {
  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <img src={pastor.photo_url} alt={pastor.name}
        className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gold/30" />
      <h3 className="mt-4 font-display text-xl font-bold text-navy">{pastor.name}</h3>
      <p className="text-gold text-sm font-medium mt-1">{pastor.title}</p>
      <p className="text-slate-500 text-sm mt-3 leading-relaxed">{pastor.bio}</p>
    </div>
  )
}
