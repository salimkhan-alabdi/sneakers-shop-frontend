import { translations } from '@/i18n/translations'
import { useLanguageStore } from '@/store/languageStore'
import React from 'react'

export default function AboutPage() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]
  const brands = [
    'Reebok',
    'Adidas',
    'Vans',
    'Calvin Klein',
    'New Era',
    'New Balance',
    'Puma',
    'Under Armour',
    'Amiri',
  ]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <header className="mb-16 border-b border-zinc-200 pb-10">
        <h1 className="mb-6 text-4xl font-black uppercase">{t.about}</h1>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-xl text-lg leading-snug text-zinc-500 md:text-xl">
            Мы объединяем наследие спортивных гигантов и дерзость современных
            люксовых домов. Твоя точка доступа к лучшим дропам планеты.
          </p>
          <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs tracking-widest uppercase">
            Since 2024
          </span>
        </div>
      </header>

      <div className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-8 text-lg leading-relaxed text-zinc-800 lg:col-span-7">
          <p>
            <strong className="font-bold text-black uppercase">KINK</strong> —
            это не просто ритейл-проект. Это селекция, основанная на глубоком
            понимании сникер-культуры. Мы верим, что обувь — это фундамент
            образа, будь то архивные силуэты{' '}
            <span className="underline decoration-zinc-300">New Balance</span>{' '}
            или премиальный деним от{' '}
            <span className="underline decoration-zinc-300">Amiri</span>.
          </p>
          <p>
            В нашем ростере — только тяжеловесы индустрии. От технологичных
            решений <span className="font-medium text-black">Under Armour</span>{' '}
            и футбольной классики{' '}
            <span className="font-medium text-black">Adidas</span> до
            скейт-культуры <span className="font-medium text-black">Vans</span>.
            Мы гарантируем 100% подлинность каждой вещи, проходя через
            многоэтапную проверку перед отправкой.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="group relative">
            <img
              className="w-full shadow-2xl"
              src="/kinkloc.jpg"
              alt="KINK Location"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg border border-black/10"></div>
          </div>
        </div>
      </div>

      <section className="border-t border-zinc-100 pt-16">
        <h3 className="mb-10 text-center text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">
          Официальные бренды / Партнеры
        </h3>
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <div key={brand} className="flex justify-center">
              <span className="cursor-default text-xl font-black tracking-tighter text-gray-500 uppercase transition-colors hover:text-black md:text-2xl">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
