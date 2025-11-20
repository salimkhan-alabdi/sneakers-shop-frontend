import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import Home from "@/pages/home"
import About from "@/pages/about"
import Contact from "@/pages/contact"
import MensPage from "@/pages/mens"
import WomensPage from "@/pages/womens"
import ProductPage from "@/pages/product"
import EventsPage from "@/pages/events"
import DeliveryPage from "@/pages/delivery"
import NewArrival from "@/pages/new-arrival"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "mens", element: <MensPage /> },
      { path: "womens", element: <WomensPage /> },
      { path: "product", element: <ProductPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "delivery", element: <DeliveryPage /> },
      { path: "new-arrival", element: <NewArrival /> },
    ],
  },
])

export default router
