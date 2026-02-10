import { Link } from 'react-router-dom'
import { translations } from '@/i18n/translations'
import { useLanguageStore } from '@/store/languageStore'
import { useLanguageNavigator } from '@/hooks/useLanguageNavigator'

export default function Footer() {
  const language = useLanguageStore((state) => state.language)

  useLanguageNavigator()

  const t = translations[language]

  return (
    <footer className="mt-12 bg-black px-1 pt-16 pb-5">
      <div className="container mx-auto mb-10 grid grid-cols-3 md:px-4">
        <div>
          <Link to={`/${language}/`}>
            <img className="w-28" src="/logo.svg" alt="KINK" />
          </Link>
          <div className="mt-3 ml-2 space-y-3 text-white">
            <div>{t.payMethod}</div>
            <div className="grid w-20 grid-cols-2 gap-3 sm:w-fit sm:grid-cols-4">
              <img className="h-7 w-7" src="/click.png" alt="click" />
              <img className="h-7 w-7" src="/payme.png" alt="payme" />
              <img className="h-7 w-7" src="/icons/card.svg" alt="card" />
              <img className="h-7 w-7" src="/icons/wallet.svg" alt="wallet" />
            </div>
          </div>
        </div>

        <ul className="space-y-5 text-sm text-white">
          <li className="hover:text-gray-400">
            <Link to={`/${language}/about`}>{t.about}</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to={`/${language}/events`}>{t.events}</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to={`/${language}/delivery`}>{t.delivery}</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to={`/${language}/contact`}>{t.contact}</Link>
          </li>
        </ul>

        <ul className="space-y-5 text-sm text-white">
          <li className="space-y-2">
            <span className="-ml-6 flex gap-1">
              <img className="w-4" src="/icons/location.svg" alt="location" />
              <h5 className="font-semibold">{t.address_name}</h5>
            </span>
            <p className="font-light">{t.address}</p>
          </li>
          <li className="space-y-2">
            <span className="-ml-6 flex gap-1">
              <img className="w-4" src="/icons/calendar.svg" alt="calendar" />
              <h5 className="font-semibold">{t.schedule_name}</h5>
            </span>
            <p className="font-light">{t.schedule}</p>
          </li>
          <li className="space-y-2">
            <span className="-ml-6 flex gap-1">
              <img className="w-4" src="/icons/call.svg" alt="call" />
              <h5 className="font-semibold">{t.phone_name}</h5>
            </span>
            <p className="font-light">(+998) 90 924 87 61</p>
          </li>
        </ul>
      </div>

      <p className="flex justify-center text-xs text-white">{t.copyright}</p>
    </footer>
  )
}
