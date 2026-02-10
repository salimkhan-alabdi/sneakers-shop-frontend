import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'

export const useProducts = (endpoint = 'products/') => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', endpoint],
    queryFn: async () => {
      const { data } = await api.get(endpoint)
      return data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache for products
  })

  return { data: products, isLoading, error }
}
