import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// === УПРАВЛЕНИЕ ОЧЕРЕДЬЮ ===
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// === ПЕРЕХВАТЧИК ЗАПРОСОВ (REQUEST INTERCEPTOR) ===
// Гарантирует, что мы отправляем токен, только если он есть.
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Удаляем заголовок, если токена нет.
      if (config.headers?.Authorization) {
        delete config.headers.Authorization
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// === ПЕРЕХВАТЧИК ОТВЕТОВ (RESPONSE INTERCEPTOR) ===
// Обрабатывает 401 Unauthorized и обновляет токен.
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config

    // 1. Проверка на необходимость обработки
    // Если не 401, уже повторяется, или запрос на обновление — пропускаем
    if (
      error.response?.status !== 401 ||
      originalReq._retry ||
      originalReq.url.includes('/token/refresh/')
    ) {
      return Promise.reject(error)
    }

    // 2. Блокируем новые запросы, пока идет обновление
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          originalReq.headers.Authorization = `Bearer ${token}`
          return instance(originalReq)
        })
        .catch((err) => Promise.reject(err))
    }

    // 3. Запуск процесса обновления токена
    originalReq._retry = true
    isRefreshing = true

    try {
      const refreshToken = localStorage.getItem('refresh_token')

      if (!refreshToken) {
        // Если нет рефреш-токена, сразу переходим к ошибке
        throw new Error('No refresh token available. Session expired.')
      }

      // Используем базовый axios, чтобы избежать рекурсии с "instance"
      const response = await axios.post(`${BASE_URL}/users/token/refresh/`, {
        refresh: refreshToken,
      })

      const { access } = response.data
      localStorage.setItem('access_token', access)

      // Успешно: Выполняем все задержанные запросы
      processQueue(null, access)

      originalReq.headers.Authorization = `Bearer ${access}`
      return instance(originalReq) // Повторяем оригинальный запрос
    } catch (refreshError) {
      // Ошибка: Рефреш-токен просрочен или недействителен

      console.error(
        'Refresh Failed. URL causing 401:',
        originalReq.url,
        'Redirecting to /login...'
      )

      processQueue(refreshError, null) // Отклоняем все запросы в очереди

      // ГАРАНТИРОВАННО ОЧИЩАЕМ И РЕДИРЕКТИМ
      localStorage.clear()

      // Используем !includes('/login') для более надежной проверки
      if (!window.location.pathname.includes('/login')) {
        window.location.replace('/login')
      }

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)
