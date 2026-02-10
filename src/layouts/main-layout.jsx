import ScrollToTop from '@/components/ScrollToTop'
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
