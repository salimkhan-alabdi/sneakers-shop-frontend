import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
