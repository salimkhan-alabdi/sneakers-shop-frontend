import { useState } from "react"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const lan = [
  {
    id: uuidv4(),
    label: "OZBEK",
    src: "icons/uz_lan.svg",
    alt: "uz",
    lan: "uz",
  },
  {
    id: uuidv4(),
    label: "РУССКИЙ",
    src: "icons/ru_lan.svg",
    alt: "ru",
    lan: "ru",
  },
  {
    id: uuidv4(),
    label: "ENGLISH",
    src: "icons/en_lan.svg",
    alt: "en",
    lan: "en",
  },
]

const icons = [
  { id: uuidv4(), src: "icons/search.svg", alt: "search" },
  { id: uuidv4(), src: "icons/bag.svg", alt: "bag" },
  { id: uuidv4(), src: "icons/user.svg", alt: "user" },
]

const links = [
  { id: uuidv4(), label: "Новинки", href: "/new-arrival" },
  { id: uuidv4(), label: "Мужчины", href: "/mens" },
  { id: uuidv4(), label: "Женщины", href: "/womens" },
  { id: uuidv4(), label: "Бренды" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState("uz")
  const toggleMenu = () => setIsOpen(!isOpen)
  const currentLang = lan.find((l) => l.lan === lang)

  return (
    <nav className='container flex justify-between items-center py-6 mx-auto px-1 md:px-4'>
      <Link to='/'>
        <img className='w-28' src='/logo.svg' alt='KINK' />
      </Link>
      <ul className='hidden gap-10 font-bold text-md tracking-wider md:flex'>
        {links.map((link) => (
          <li key={link.id}>
            {link.href ? (
              <Link to={link.href}>{link.label}</Link>
            ) : (
              <span className='cursor-default'>{link.label}</span>
            )}
          </li>
        ))}
      </ul>
      <span className='flex gap-3'>
        {/* MOBILE MENU */}
        <button className='cursor-pointer' onClick={toggleMenu}>
          <img
            className='flex md:hidden w-[27px]'
            src={isOpen ? "icons/close.svg" : "icons/menu.svg"}
            alt={isOpen ? "close" : "menu"}
          />
        </button>

        {/* LANGUAGE SELECT */}
        <div className='relative'>
          <button
            onClick={() => setOpen(!open)}
            className='w-8 h-8 flex items-center justify-center'
          >
            <img
              src={currentLang.src}
              alt={currentLang.lan}
              className='w-6 h-6'
            />
          </button>

          {open && (
            <div className='absolute left-0 top-10 bg-white shadow-lg rounded p-2 w-28'>
              {lan.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setLang(l.lan)
                    setOpen(false)
                  }}
                  className='flex items-center gap-2 w-full py-1 hover:bg-gray-100'
                >
                  <img src={l.src} alt={l.lan} className='w-5 h-5' />
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NAV ICON */}
        {icons.map((icon) => (
          <button key={icon.id} className='cursor-pointer'>
            <img className='w-6' src={icon.src} alt={icon.alt} />
          </button>
        ))}
      </span>
    </nav>
  )
}
