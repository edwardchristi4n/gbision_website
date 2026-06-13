// Badge / pill label kecil — untuk status (aktif/nonaktif), kategori, dll
import { cn } from '@/lib/utils'

interface Props { label: string; variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; className?: string }

const variants = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger:  'bg-red-100 text-red-700',
  info:    'bg-sky-100 text-sky-700',
  neutral: 'bg-slate-100 text-slate-600',
}

export default function Badge({ label, variant = 'neutral', className }: Props) {
  return <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium', variants[variant], className)}>{label}</span>
}
