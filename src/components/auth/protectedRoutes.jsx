// src/components/auth/protectedRoutes.jsx (ИСПРАВЛЕНО)

import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
// import { useAuthStore } from '@/store/useAuthStore.js'; // Больше не нужен тут

export const ProtectedRoutes = () => {
  const { lang } = useParams()
  const location = useLocation()

  // !!! УДАЛЕН useEffect с checkAuth() !!!

  const token = localStorage.getItem('access_token')

  // Если токена нет, немедленно редиректим, не делая API-запросов
  if (!token) {
    // ВАЖНО: Мы редиректим на /:lang/login, который теперь БЕЗ MainLayout
    return <Navigate to={`/${lang}/login`} state={{ from: location }} replace />
  }

  // Рендерим дочерние роуты
  return <Outlet />
}
