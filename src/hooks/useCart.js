import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { instance } from '@/api/axios'
import { toast } from 'sonner'

export const useCart = () => {
    const queryClient = useQueryClient()

    const { data: cart = { items: [] }, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const { data } = await instance.get('cart/')
            return data
        },
        // The API returns { items: [...] }, so we default to that structure
        initialData: { items: [] },
    })

    // === ADD ITEM ===
    const addItemMutation = useMutation({
        mutationFn: async ({ productId, sizeId, quantity = 1 }) => {
            const body = { product_id: productId, quantity }
            if (Number.isInteger(sizeId)) {
                body.size_id = sizeId
            }
            return instance.post('/cart/add/', body)
        },
        onSuccess: () => {
            toast.success('Added to cart')
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (err) => {
            console.error(err)
            toast.error(err.response?.data?.error || 'Failed to add to cart')
        },
    })

    // === UPDATE ITEM (Optimistic) ===
    const updateItemMutation = useMutation({
        mutationFn: async ({ id, quantity }) => {
            return instance.put(`cart/item/${id}/update/`, { quantity })
        },
        onMutate: async ({ id, quantity }) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] })
            const previousCart = queryClient.getQueryData(['cart'])

            queryClient.setQueryData(['cart'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    items: old.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                }
            })

            return { previousCart }
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(['cart'], context.previousCart)
            toast.error('Failed to update cart')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
    })

    // === REMOVE ITEM (Optimistic) ===
    const removeItemMutation = useMutation({
        mutationFn: async (id) => {
            return instance.delete(`cart/item/${id}/remove/`)
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] })
            const previousCart = queryClient.getQueryData(['cart'])

            queryClient.setQueryData(['cart'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    items: old.items.filter((item) => item.id !== id),
                }
            })

            return { previousCart }
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(['cart'], context.previousCart)
            toast.error('Failed to remove item')
        },
        onSuccess: () => {
            toast.success('Removed from cart')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
    })

    // === CLEAR CART ===
    const clearCartMutation = useMutation({
        mutationFn: async () => {
            return instance.delete('cart/clear/')
        },
        onSuccess: () => {
            toast.success('Cart cleared')
            queryClient.setQueryData(['cart'], { items: [] })
        },
        onError: () => {
            toast.error('Failed to clear cart')
        },
    })

    return {
        cartItems: cart.items || [],
        isLoading,
        addItem: addItemMutation.mutate,
        updateItem: updateItemMutation.mutate,
        removeItem: removeItemMutation.mutate,
        clearCart: clearCartMutation.mutate,
    }
}
