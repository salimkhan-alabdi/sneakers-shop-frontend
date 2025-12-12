// src/utils/lang.js
export const LANGUAGES = ['uz', 'ru', 'en']

export const getLangFromUrl = (pathname) => {
  const lang = pathname.split('/')[1]
  return LANGUAGES.includes(lang) ? lang : 'uz'
}

export const removeLangFromPath = (pathname) => {
  const segments = pathname.split('/')
  if (LANGUAGES.includes(segments[1])) segments.splice(1, 1)
  return segments.join('/') || '/'
}
