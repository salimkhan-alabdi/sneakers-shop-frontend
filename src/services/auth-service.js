import { instance } from '@/api/axios.js'

export const authService = {
  login: async (username, password) => {
    return instance.post('/users/login', { username, password })
  },
  logout: async () => {
    return ''
  },
  register: async () => {
    return instance.post('/', data)
  },
  getProfile: async () => {
    return instance.get('/users/profile')
  },
}
