// Reusable Button component dengan variant (primary, secondary, danger, ghost)
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary:   'bg-navy text-white hover:bg-navy-light',
  secondary: 'bg-gold text-navy hover:bg-gold-light',
  danger:    'bg-red-500 text-white hover:bg-red-600',
  ghost:     'bg-transparent text-navy border border-navy hover:bg-sky-light',
}
const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5', lg: 'px-7 py-3 text-lg' }

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  return (
    <button className={cn('rounded-lg font-medium transition disabled:opacity-50', variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
