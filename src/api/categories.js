import { api } from '@/api/index.js'

export const createCategory = (name) => {
  return api.post('categories/', { name })
}
