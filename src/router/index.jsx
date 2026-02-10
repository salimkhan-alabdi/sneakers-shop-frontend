import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/layouts/main-layout'
import { ProtectedRoutes } from '@/components/auth/protectedRoutes.jsx'
import Loader from '@/components/loader'

// Lazy load pages
const Home = lazy(() => import('@/pages/home'))
const About = lazy(() => import('@/pages/about'))
const Contact = lazy(() => import('@/pages/contact'))
const MensPage = lazy(() => import('@/pages/mens'))
const WomensPage = lazy(() => import('@/pages/womens'))
const ProductPage = lazy(() => import('@/pages/product'))
const EventsPage = lazy(() => import('@/pages/events'))
const DeliveryPage = lazy(() => import('@/pages/delivery'))
const NewArrival = lazy(() => import('@/pages/new-arrival'))
const CategoryPage = lazy(() => import('@/pages/category'))
const LoginPage = lazy(() => import('@/pages/login'))
const RegisterPage = lazy(() => import('@/pages/register'))
const ProfilePage = lazy(() => import('@/pages/profile/index.jsx'))
const NotFoundPage = lazy(() => import('@/pages/notfound'))
const CartPage = lazy(() => import('@/pages/cart/index.jsx'))
const FavoritesPage = lazy(() => import('@/pages/favorites/index.jsx'))
const OrderPage = lazy(() => import('@/pages/order/index.jsx'))
const BrandsPage = lazy(() => import('@/pages/brands/index.jsx'))
const OrderList = lazy(() => import('@/pages/orders/index.jsx'))
const OrderDetails = lazy(() => import('@/pages/order-details/index.jsx'))

// eslint-disable-next-line no-unused-vars
const withSuspense = (WrappedComponent) => (
  <Suspense fallback={<Loader />}>
    <WrappedComponent />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/:lang',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'about', element: withSuspense(About) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: 'mens', element: withSuspense(MensPage) },
      { path: 'womens', element: withSuspense(WomensPage) },
      { path: 'product', element: withSuspense(ProductPage) },
      { path: 'product/:slug', element: withSuspense(ProductPage) },
      { path: 'events', element: withSuspense(EventsPage) },
      { path: 'delivery', element: withSuspense(DeliveryPage) },
      { path: 'new-arrival', element: withSuspense(NewArrival) },
      { path: 'category/:slug', element: withSuspense(CategoryPage) },
      { path: 'brand/:slug', element: withSuspense(BrandsPage) },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: 'profile', element: withSuspense(ProfilePage) },
          { path: 'cart', element: withSuspense(CartPage) },
          { path: 'favorites', element: withSuspense(FavoritesPage) },
          { path: 'order', element: withSuspense(OrderPage) },
          { path: 'orders', element: withSuspense(OrderList) },
          { path: 'orders/:id', element: withSuspense(OrderDetails) },
        ],
      },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
  {
    path: '/:lang',
    children: [
      { path: 'login', element: withSuspense(LoginPage) },
      { path: 'register', element: withSuspense(RegisterPage) },
    ],
  },
  { path: '*', element: <Navigate to="/ru" replace /> },
])

export default router
