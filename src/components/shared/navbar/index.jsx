// Updated Navbar with cart dropdown
// (You can integrate this into your project and adjust styling)

import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SearchProducts from '@/features/search/index.jsx'
import { translations } from '@/i18n/translations'
import { useLanguageStore } from '@/store/languageStore'
import { instance } from '@/api/axios.js'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/button/index.jsx'
import { useFavoritesStore } from '@/store/favoritesStore.js'
import { api } from '@/api/index.js'

const LANG_ICONS = {
  uz: '/icons/uz_lan.svg',
  ru: '/icons/ru_lan.svg',
  en: '/icons/en_lan.svg',
}

const ICONS = [
  { src: '/icons/search.svg', alt: 'search' },
  { src: '/icons/bag.svg', alt: 'bag' },
  { src: '/icons/user.svg', alt: 'user' },
]

export default function Navbar() {
  const { items, fetchCart } = useCartStore()
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const [availableLanguages] = useState(['uz', 'ru', 'en'])
  const [openMenu, setOpenMenu] = useState(null)
  const [openBrand, setBrand] = useState(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const brandsRef = useRef(null)
  const [brands, setBrands] = useState([])
  const { favorites, loadFavorites } = useFavoritesStore()

  const favoritesCount = favorites.length
  console.log(items)
  const token = localStorage.getItem('access_token')

  // Определяем, находимся ли мы на странице авторизации
  const isAuthPage =
    location.pathname.includes('/login') ||
    location.pathname.includes('/register')

  // Если у вас есть запросы, требующие токена (например, для корзины)
  useEffect(() => {
    // ВАЖНО: Делаем запросы, только если токен есть И мы не на странице авторизации
    if (token && !isAuthPage) {
      // Здесь вызывайте функции, которые делают API-запросы (например, fetchCartCount())
    }
  }, [token, isAuthPage])

  useEffect(() => {
    // ЗАЩИЩАЕМ ЧАСТНЫЕ ДАННЫЕ
    if (token) {
      fetchCart()
      loadFavorites()
    }
  }, [token])

  const handleToggle = (type) => setOpenMenu(openMenu === type ? null : type)

  const handleChangeLanguage = async (lang) => {
    if (lang === language) return

    try {
      await instance.post('/shared/language/set/', {
        language: lang,
      })

      setLanguage(lang)
      localStorage.setItem('site_lang', lang)
      setOpenMenu(null)

      const segments = location.pathname.split('/').filter(Boolean)

      if (['uz', 'ru', 'en'].includes(segments[0])) {
        segments[0] = lang
      } else {
        segments.unshift(lang)
      }

      navigate('/' + segments.join('/'), { replace: true })
    } catch (err) {
      console.error(err)
    }
  }

  const links = [
    { label: translations[language].new, href: '/new-arrival' },
    { label: translations[language].men, href: '/mens' },
    { label: translations[language].women, href: '/womens' },
    { label: translations[language].brands, href: null },
  ]
  useEffect(() => {
    // Получаем бренды с бекенда
    const fetchBrands = async () => {
      try {
        const res = await api.get('brands/') // замените на ваш эндпоинт
        setBrands(res.data)
        console.log(
          'Brands slugs:',
          res.data.map((brand) => brand.slug)
        )
        console.log(
          'Brands fdaasda:',
          brands.map((b) => ({ id: b.id, name: b.name, slug: b.slug }))
        )
      } catch (err) {
        console.error('Ошибка загрузки брендов:', err)
      }
    }
    fetchBrands()
  }, [])

  return (
    <nav className='container flex justify-between items-center py-6 mx-auto px-4 flex-1'>
      <Link to={`/${language}/`}>
        <img className='w-28' src='/logo.svg' alt='KINK' />
      </Link>

      <ul className='hidden gap-10 font-bold text-md tracking-wider md:flex'>
        {links.map((link) =>
          link.href ? (
            <li key={link.label}>
              <Link
                to={`/${language}${link.href}`}
                className='hover:text-gray-500 transition-colors'
              >
                {link.label}
              </Link>
            </li>
          ) : (
            <li
              key={link.label}
              className='relative group'
              onMouseEnter={() => setOpenMenu('brands')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span
                className={`cursor-pointer transition-colors ${
                  openMenu === 'brands' ? 'text-gray-400' : ''
                }`}
              >
                {link.label}
              </span>

              {/* Выпадающее меню */}
              <div
                className={`
      absolute top-full left-0 mt-2 z-50
      transition-all duration-300 ease-in-out
      ${
        openMenu === 'brands'
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible translate-y-2'
      }
    `}
              >
                <div className='bg-white border shadow-xl w-72 max-h-96 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {brands.length === 0 ? (
                    <p className='col-span-3 text-center text-gray-400'>
                      Загрузка...
                    </p>
                  ) : (
                    brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/${language}/brand/${brand.slug}`}
                        className='hover:text-black text-gray-600 hover:translate-x-1 transition-all block text-sm font-medium'
                        onClick={() => setOpenMenu(null)}
                      >
                        {brand.slug}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </li>
          )
        )}
      </ul>

      <div className='flex items-center gap-4 relative' ref={menuRef}>
        <button
          className='md:hidden cursor-pointer'
          onClick={() => handleToggle('menu')}
        >
          <img
            className='w-6'
            src={openMenu === 'menu' ? '/icons/close.svg' : '/icons/menu.svg'}
            alt='menu'
          />
        </button>

        <div className='relative'>
          <button
            className='flex items-center justify-center w-8 h-8 cursor-pointer'
            onClick={() => handleToggle('lang')}
          >
            <img
              src={LANG_ICONS[language]}
              alt={language}
              className='w-6 h-6'
            />
          </button>

          {openMenu === 'lang' && (
            <div className='absolute left-0 top-full mt-2 bg-white border-2 w-32 z-50 flex flex-col'>
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleChangeLanguage(lang)}
                  className='flex items-center gap-2 w-full px-3 py-2 text-left border-b last:border-b-0 cursor-pointer'
                >
                  <span className='uppercase'>{lang}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='flex items-center gap-3'>
          {ICONS.map((icon) => {
            if (icon.alt === 'search')
              return (
                <button
                  key={icon.alt}
                  className='cursor-pointer'
                  onClick={() => handleToggle('search')}
                >
                  <img className='w-6 h-6' src={icon.src} alt={icon.alt} />
                </button>
              )
            if (icon.alt === 'user')
              return (
                <Link
                  key={icon.alt}
                  to={`/${language}/login`}
                  onClick={() => setOpenMenu(null)}
                >
                  <img className='w-6 h-6' src={icon.src} alt={icon.alt} />
                </Link>
              )
            if (icon.alt === 'bag')
              return (
                <button
                  key='bag'
                  className='relative cursor-pointer'
                  onClick={() => handleToggle('cart')}
                >
                  <img className='w-6 h-6' src='/icons/bag.svg' alt='bag' />
                  {totalItems > 0 && (
                    <span className='absolute -top-2 -right-2 bg-black border-2 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                      {totalItems}
                    </span>
                  )}
                </button>
              )
            return null
          })}
        </div>

        {/* SEARCH DROPDOWN */}
        {openMenu === 'search' && (
          <div className='absolute right-0 top-full mt-2 z-50'>
            <SearchProducts onClose={() => setOpenMenu(null)} />
          </div>
        )}

        {/* CART */}
        {openMenu === 'cart' && (
          <div className='absolute right-0 top-full mt-3 bg-white shadow-lg border w-72 z-50 p-3 flex flex-col gap-3'>
            {items.length === 0 ? (
              <p className='text-center text- text-gray-300Сохра py-2'>
                Корзина пуста
              </p>
            ) : (
              items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className='flex items-center gap-3 border-b pb-2'
                >
                  <img
                    src={`http://127.0.0.1:8000/${item.product.images[0].image}`}
                    alt={item.product.name}
                    className='w-16 h-16 object-contain'
                  />

                  <div className='flex flex-col text-sm'>
                    <span className='font-semibold'>{item.product.name}</span>
                    {item.size && (
                      <span>
                        Размер:{' '}
                        {typeof item.size === 'object'
                          ? item.size.size || item.size.id || '—'
                          : item.size}
                      </span>
                    )}
                    <span>Количество: {item.quantity}</span>
                  </div>
                </div>
              ))
            )}
            {items.length > 3 && (
              <p className='text-sm text-gray-500 mt-2 text-center'>
                Еще {items.length - 3} товара в вашей корзине
              </p>
            )}
            <span className='flex gap-3 items-center'>
              <img
                className='size-8 cursor-pointer active:scale-95 transition'
                src='/icons/save2.svg'
                alt='save'
              />

              <p
                onClick={() => {
                  navigate(`/${language}/favorites`)
                  setOpenMenu(null)
                }}
                className='text-sm underline cursor-pointer flex items-center gap-2'
              >
                Сохраненные товары
                {favoritesCount > 0 && (
                  <span className='text-xs'>({favoritesCount})</span>
                )}
              </p>
            </span>

            <span className='flex gap-3 items-center border-t pt-3'>
              <img
                className='size-8 cursor-pointer active:scale-95 transition'
                src='/icons/box.svg'
                alt='save'
              />

              <p
                onClick={() => {
                  navigate(`/${language}/order`)
                  setOpenMenu(null)
                }}
                className='text-sm underline cursor-pointer flex items-center gap-2'
              >
                Заказы
              </p>
            </span>

            {items.length > 0 && (
              <Button
                onClick={() => {
                  navigate(`/${language}/cart`)
                  setOpenMenu(null)
                }}
                className='mt-2 py-2 bg-black text-white w-full'
              >
                Открыть корзину
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
