import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const truncate = (str: string, n: number) => str.length > n ? str.slice(0, n) + "…" : str
