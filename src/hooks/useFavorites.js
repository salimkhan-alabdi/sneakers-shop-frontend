import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { instance } from '@/api/axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'

export const useFavorites = () => {
    const queryClient = useQueryClient()
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const { data } = await instance.get('favorites/')
            return data
        },
        enabled: isAuthenticated,
    })

    const toggleFavoriteMutation = useMutation({
        mutationFn: async (product) => {
            return instance.post('/favorites/toggle/', { product_id: product.id })
        },
        onMutate: async (product) => {
            await queryClient.cancelQueries({ queryKey: ['favorites'] })
            const previousFavorites = queryClient.getQueryData(['favorites']) || []

            // Optimistic update
            queryClient.setQueryData(['favorites'], (old = []) => {
                const exists = old.find(
                    (fav) => fav.product && fav.product.id === product.id
                )
                if (exists) {
                    return old.filter((fav) => fav.product.id !== product.id)
                } else {
                    return [...old, { product }]
                }
            })

            // Return context for rollback and message
            const wasFavorite = previousFavorites.some(
                (fav) => fav.product.id === product.id
            )
            return { previousFavorites, wasFavorite }
        },
        onError: (err, product, context) => {
            queryClient.setQueryData(['favorites'], context.previousFavorites)
            toast.error('Failed to update favorites')
        },
        onSuccess: (_, __, context) => {
            if (context.wasFavorite) {
                toast.info('Removed from favorites')
            } else {
                toast.success('Added to favorites')
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        },
    })

    // Helper to check if a product is favorite
    const isFavorite = (productId) => {
        return favorites.some((fav) => fav.product && fav.product.id === productId)
    }

    return {
        favorites,
        isLoading,
        toggleFavorite: toggleFavoriteMutation.mutate,
        isFavorite
    }
}
