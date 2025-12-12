import { authService } from '@/services/auth-service.js'
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const { access, refresh } = await authService.login(username, password)
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      const user = await authService.getProfile()
      set({
        user: user,
        isAuthenticated: true,
        loading: false,
      })
      return true
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Login failed',
        loading: false,
      })
      return false
    }
  },

  logout: () => {
    // Убираем async, если authService.logout не нужен
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false }) // Убедитесь, что здесь НЕТ редиректа!
  },
  // useAuthStore.js (ИСПРАВЛЕНО - checkAuth)

  checkAuth: async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    try {
      const user = await authService.getProfile()
      set({ user: user, isAuthenticated: true })
    } catch (error) {
      // !!! УДАЛЯЕМ ОЧИСТКУ !!!
      // Интерцептор обработает эту 401 ошибку, очистит токены
      // и выполнит редирект, если это необходимо.

      // localStorage.removeItem('access_token')
      // localStorage.removeItem('refresh_token')
      set({ user: null, isAuthenticated: false })
    }
  },
}))
