// Generic data fetching hook — loading, error, data state
import { useState, useEffect } from 'react'
import api from '@/lib/axios'

export function useFetch<T>(url: string, params?: Record<string, unknown>) {
  const [data, setData]     = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api.get<T>(url, { params })
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [url, JSON.stringify(params)])

  return { data, loading, error }
}
