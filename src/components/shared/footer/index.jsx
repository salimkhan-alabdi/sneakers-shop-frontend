import { Link } from 'react-router-dom'
import { translations } from '@/i18n/translations'
import { useLanguageStore } from '@/store/languageStore'
import { useLanguageNavigator } from '@/hooks/useLanguageNavigator'

export default function Footer() {
  const language = useLanguageStore((state) => state.language)

  // хук, который следит за языком и обновляет URL
  useLanguageNavigator()

  const t = translations[language]

  return (
    <footer className='bg-black pt-16 pb-5 px-1 mt-12'>
      <div className='container grid grid-cols-3 mx-auto md:px-4 mb-10'>
        {/* Логотип и способы оплаты */}
        <div>
          <Link to={`/${language}/`}>
            <img className='w-28' src='/logo.svg' alt='KINK' />
          </Link>
          <div className='space-y-3 ml-2 mt-3 text-white'>
            <div>{t.payMethod}</div>
            <div className='flex gap-3'>
              <img className='w-7 h-7' src='/click.png' alt='click' />
              <img className='w-7 h-7' src='/payme.png' alt='payme' />
              <img className='w-7 h-7' src='/icons/card.svg' alt='card' />
              <img className='w-7 h-7' src='/icons/wallet.svg' alt='wallet' />
            </div>
          </div>
        </div>

        {/* Ссылки */}
        <ul className='text-white space-y-5 text-sm'>
          <li>
            <Link to={`/${language}/about`}>{t.about}</Link>
          </li>
          <li>
            <Link to={`/${language}/events`}>{t.events}</Link>
          </li>
          <li>
            <Link to={`/${language}/delivery`}>{t.delivery}</Link>
          </li>
          <li>
            <Link to={`/${language}/contact`}>{t.contact}</Link>
          </li>
        </ul>

        {/* Контакты */}
        <ul className='text-white text-sm space-y-5'>
          <li className='space-y-2'>
            <span className='flex -ml-6 gap-1'>
              <img className='w-4' src='/icons/location.svg' alt='location' />
              <h5 className='font-semibold'>{t.address_name}</h5>
            </span>
            <p className='font-light'>{t.address}</p>
          </li>
          <li className='space-y-2'>
            <span className='flex -ml-6 gap-1'>
              <img className='w-4' src='/icons/calendar.svg' alt='calendar' />
              <h5 className='font-semibold'>{t.schedule_name}</h5>
            </span>
            <p className='font-light'>{t.schedule}</p>
          </li>
          <li className='space-y-2'>
            <span className='flex -ml-6 gap-1'>
              <img className='w-4' src='/icons/call.svg' alt='call' />
              <h5 className='font-semibold'>{t.phone_name}</h5>
            </span>
            <p className='font-light'>(+998) 90 924 87 61</p>
          </li>
        </ul>
      </div>

      <p className='flex justify-center text-white text-xs'>{t.copyright}</p>
    </footer>
  )
}
