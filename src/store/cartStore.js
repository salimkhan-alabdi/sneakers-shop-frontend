import { create } from 'zustand'
import { instance } from '@/api/axios.js'

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true })
    try {
      const res = await instance.get('cart/')
      set({ items: res.data.items || [], loading: false })
    } catch (error) {
      console.error(error)
      set({ loading: false })
    }
  },

  addItem: async (productId, sizeId = null, quantity = 1) => {
    try {
      // формируем тело запроса
      const body = { product_id: productId, quantity }

      // добавляем size_id только если это число
      if (Number.isInteger(sizeId)) {
        body.size_id = sizeId
      }

      await instance.post('/cart/add/', body)
      get().fetchCart()
    } catch (err) {
      const data = err.response?.data
      if (data?.error) {
        alert(data.error)
      } else {
        console.error('Ошибка добавления в корзину:', data || err.message)
      }
    }
  },

  updateItem: async (id, quantity) => {
    try {
      await instance.put(`cart/item/${id}/update/`, { quantity })
      get().fetchCart()
    } catch (error) {
      console.error(error)
    }
  },

  removeItem: async (id) => {
    try {
      await instance.delete(`cart/item/${id}/remove/`)
      get().fetchCart()
    } catch (error) {
      console.error(error)
    }
  },

  clearCart: async () => {
    try {
      await instance.delete('cart/clear/')
      set({ items: [] })
    } catch (error) {
      console.error(error)
    }
  },
}))
