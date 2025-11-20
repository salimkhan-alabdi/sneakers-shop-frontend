import Navbar from "@/components/shared/navbar.jsx"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
