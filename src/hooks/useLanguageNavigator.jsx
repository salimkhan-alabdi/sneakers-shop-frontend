import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'

export function useLanguageNavigator() {
  const language = useLanguageStore((state) => state.language)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const segments = location.pathname.split('/')
    if (['uz', 'ru', 'en'].includes(segments[1])) {
      segments[1] = language
    } else {
      segments.splice(1, 0, language)
    }
    const newPath = segments.join('/')
    if (location.pathname !== newPath) {
      navigate(newPath, { replace: true })
    }
  }, [language, location.pathname, navigate])
}
