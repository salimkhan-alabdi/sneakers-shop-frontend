import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/main-layout'
import Home from '@/pages/home'
import About from '@/pages/about'
import Contact from '@/pages/contact'
import MensPage from '@/pages/mens'
import WomensPage from '@/pages/womens'
import ProductPage from '@/pages/product'
import EventsPage from '@/pages/events'
import DeliveryPage from '@/pages/delivery'
import NewArrival from '@/pages/new-arrival'
import CategoryPage from '@/pages/category'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import ProfilePage from '@/pages/profile/index.jsx'
import NotFoundPage from '@/pages/notfound'
import { ProtectedRoutes } from '@/components/auth/protectedRoutes.jsx'
import CartPage from '@/pages/cart/index.jsx'
import FavoritesPage from '@/pages/favorites/index.jsx'
import Order from '@/pages/order/index.jsx'
import OrderPage from '@/pages/order/index.jsx'
import BrandsPage from '@/pages/brands/index.jsx'
import OrderList from '@/pages/orders/index.jsx'
import OrderDetails from '@/pages/order-details/index.jsx'

// router.jsx (ИСПРАВЛЕНО - ПУБЛИЧНЫЙ БЛОК)
const router = createBrowserRouter([
  {
    path: '/:lang',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'mens', element: <MensPage /> },
      { path: 'womens', element: <WomensPage /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'delivery', element: <DeliveryPage /> },
      { path: 'new-arrival', element: <NewArrival /> },
      { path: 'category/:slug', element: <CategoryPage /> },
      { path: 'brand/:slug', element: <BrandsPage /> },
      {
        element: <ProtectedRoutes />, // <-- ProtectedRoutes теперь просто обертка
        children: [
          // Теперь это просто страницы, которые будут вставлены в Outlet родителя
          { path: 'profile', element: <ProfilePage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'favorites', element: <FavoritesPage /> },
          { path: 'order', element: <OrderPage /> },
          { path: 'orders', element: <OrderList /> },
          { path: 'orders/:id', element: <OrderDetails /> },
        ],
      },

      // Обратите внимание, что NotFoundPage теперь тоже в MainLayout
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // 1.2. Добавьте роуты авторизации БЕЗ MainLayout
  {
    path: '/:lang',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  // 1.3. Исправьте защищенные роуты, используя Outlet
  {
    path: '/:lang',
    element: <ProtectedRoutes />, // ProtectedRoutes отвечает за проверку
    children: [
      // Все защищенные страницы используют MainLayout, чтобы иметь Navbar/Footer
      {
        path: 'profile',
        element: <MainLayout></MainLayout>,
      },
      {
        path: 'cart',
        element: (
          <MainLayout>
            <CartPage />
          </MainLayout>
        ),
      },
      {
        path: 'favorites',
        element: (
          <MainLayout>
            <FavoritesPage />
          </MainLayout>
        ),
      },
    ],
  },

  // 1.4. Финальный редирект (оставляем)
  { path: '*', element: <Navigate to='/ru' replace /> },
])

export default router
