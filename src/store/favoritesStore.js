import { create } from 'zustand'
import { instance } from '@/api/axios.js'

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  loading: false,

  loadFavorites: async () => {
    // === КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ ===
    const token = localStorage.getItem('access_token')
    if (!token) {
      set({ favorites: [], loading: false }) // Очищаем состояние и завершаемся
      return
    }
    try {
      set({ loading: true })
      const res = await instance.get('favorites/')
      set({ favorites: res.data })
    } catch (err) {
      console.error('Ошибка загрузки избранного:', err) // Важно: если здесь 401, интерцептор сам очистит токены и редиректит. // Если это просто ошибка сети, то редиректа не будет.
    } finally {
      set({ loading: false })
    }
  },

  toggleFavorite: async (product) => {
    try {
      const exists = get().favorites.find(
        (fav) => fav.product && fav.product.id === product.id
      )

      set((state) => ({
        favorites: exists
          ? state.favorites.filter((fav) => fav.product.id !== product.id)
          : [...state.favorites, { product }], // сохраняем весь объект продукта
      }))

      // backend
      await instance.post('/favorites/toggle/', { product_id: product.id })
    } catch (err) {
      console.error('Ошибка toggle: ', err)
      // откат при ошибке
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.product.id !== product.id
        ),
      }))
    }
  },
  isFavorite: (productId) => {
    return get().favorites.some(
      (fav) => fav.product && fav.product.id === productId
    )
  },
}))
