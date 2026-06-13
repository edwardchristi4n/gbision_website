// Hook paginasi — halaman, ukuran, handler next/prev
import { useState } from 'react'

export function usePagination(initialPage = 1, initialSize = 10) {
  const [page, setPage] = useState(initialPage)
  const [size] = useState(initialSize)
  return {
    page, size,
    nextPage: () => setPage(p => p + 1),
    prevPage: () => setPage(p => Math.max(1, p - 1)),
    goTo: (n: number) => setPage(n),
    reset: () => setPage(1),
  }
}
