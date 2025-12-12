import { create } from 'zustand'
import { instance } from '@/api/axios'

const LS_KEY = 'site_lang'

export const useLanguageStore = create((set, get) => ({
  language: localStorage.getItem(LS_KEY) || 'ru',
  availableLanguages: ['ru', 'uz', 'en'],

  setLanguage: async (newLang, shouldSaveToBackend = true) => {
    if (get().language === newLang) return

    set({ language: newLang })
    localStorage.setItem(LS_KEY, newLang)

    if (shouldSaveToBackend) {
      try {
        await instance.post('shared/language/set/', { language: newLang })
      } catch (err) {
        console.error('Не удалось сохранить язык на бэке:', err)
      }
    }
  },

  fetchLanguage: async () => {
    try {
      const response = await instance.get('shared/language/get/')
      const { language, available_languages } = response.data
      if (language) {
        set({ language, availableLanguages: available_languages })
        localStorage.setItem(LS_KEY, language)
      }
    } catch (err) {
      console.log('Бэкенд недоступен, работаем на локальных данных')
    }
  },
}))
