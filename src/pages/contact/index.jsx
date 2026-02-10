import React, { useState } from 'react' // Добавили useState
import {
  Clock,
  MessageCircle,
  Instagram,
  Navigation,
  ExternalLink,
} from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'

export default function ContactPage() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const ADDRESS = 'Ташкент, ул. Паркентская, 283'
  const PHONE = '+998 90 924 87 61'
  const GOOGLE_MAPS_URL =
    'https://www.google.com/maps/search/?api=1&query=41.3086784,69.3372194'

  const LAT = '41.3086784'
  const LNG = '69.3372194'

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <header className="mb-16 border-b border-zinc-200 pb-10">
        <h1 className="mb-6 text-4xl font-black uppercase">{t.contact}</h1>
        <p className="mt-4 text-lg font-medium text-zinc-500">
          Главный штаб кроссовок в Ташкенте.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <div className="bg-black p-8 text-white shadow-2xl">
            <div className="space-y-10">
              <section>
                <h3 className="mb-6 text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
                  Связаться
                </h3>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="group block"
                >
                  <p className="text-2xl font-bold transition-colors group-hover:text-zinc-400">
                    {PHONE}
                  </p>
                  <span className="mt-2 block text-[10px] tracking-widest text-zinc-600 uppercase">
                    Direct Line
                  </span>
                </a>
              </section>

              <section>
                <h3 className="mb-6 text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
                  Локация
                </h3>
                <p className="text-lg leading-tight font-bold">{ADDRESS}</p>
                <p className="mt-2 text-xs tracking-widest text-zinc-400 uppercase">
                  Ориентир: ул. Паркентская
                </p>
              </section>

              <section>
                <h3 className="mb-6 text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
                  График
                </h3>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-zinc-500" />
                  <p className="text-lg font-bold">11:00 — 22:00</p>
                </div>
                <p className="mt-2 text-[10px] tracking-widest text-zinc-600 uppercase">
                  Без выходных
                </p>
              </section>

              <div className="flex gap-3 pt-6">
                <a
                  href="https://www.instagram.com/kink_uz/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 justify-center bg-zinc-800 py-4 transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://t.me/kink_uz"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 justify-center bg-zinc-800 py-4 transition-all duration-300 hover:bg-[#229ED9]"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative lg:col-span-8">
          <div className="relative h-full min-h-[500px] overflow-hidden border border-zinc-200 bg-zinc-100 shadow-inner">
            <div className="absolute inset-0 z-0">
              <img
                src="/map.png" // Замените на свое фото магазина или скриншот карты
                alt="Map placeholder"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center"></div>
              </div>
            </div>

            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${LNG}%2C${LAT}&z=16&pt=${LNG},${LAT},pm2rdm&l=map`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              onLoad={() => setIsMapLoaded(true)}
              className={`relative z-10 contrast-125 invert-[0.05] filter transition-opacity duration-1000 ${isMapLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'} `}
              title="KINK Location"
            ></iframe>

            <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/60 to-transparent p-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 bg-white px-8 py-5 text-xs font-black tracking-[0.2em] text-black uppercase shadow-xl transition-all hover:bg-zinc-200 active:scale-95 md:w-auto"
              >
                <Navigation size={18} fill="black" />
                Проложить маршрут
                <ExternalLink size={14} className="opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
