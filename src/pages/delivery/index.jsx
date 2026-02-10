import React from 'react'
import { Truck, Package, Store, Info } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
export default function DeliveryPage() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-16">
        <h1 className="mb-6 text-4xl font-black uppercase">{t.delivery}</h1>
        <p className="max-w-2xl text-lg text-zinc-500">
          KINK.UZ объединяет лучшие магазины Ташкента на одной платформе. Мы
          сделали процесс шоппинга быстрым, прозрачным и мобильным.
        </p>
      </header>

      <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="border border-zinc-100 bg-zinc-50 p-6">
          <Truck className="mb-4 text-black" size={32} />
          <h3 className="mb-2 font-bold uppercase">Курьерская доставка</h3>
          <p className="text-sm text-zinc-600">
            Доставляем заказы прямо до вашей двери по всему Ташкенту и
            Узбекистану.
          </p>
        </div>
        <div className="border border-zinc-100 bg-zinc-50 p-6">
          <Store className="mb-4 text-black" size={32} />
          <h3 className="mb-2 font-bold uppercase">Самовывоз</h3>
          <p className="text-sm text-zinc-600">
            Забирайте заказы лично в офлайн-точках наших партнеров после
            подтверждения.
          </p>
        </div>
        <div className="border border-zinc-100 bg-zinc-50 p-6">
          <Package className="mb-4 text-black" size={32} />
          <h3 className="mb-2 font-bold uppercase">Контроль качества</h3>
          <p className="text-sm text-zinc-600">
            Реальные фото товаров и система фильтров гарантируют точность вашего
            выбора.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section className="grid items-start gap-8 border-t border-zinc-100 pt-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">
              Как это работает?
            </h2>
            <p className="leading-relaxed text-zinc-700">
              KINK — это агрегатор более 80 фирменных магазинов. Вы выбираете
              товары, пользуясь удобной навигацией по категориям, размерам и
              ценам, а мы синхронизируем ваш заказ с конкретным продавцом.
            </p>
          </div>
          <div className="bg-zinc-900 p-8 text-white">
            <h4 className="mb-4 text-sm font-bold text-zinc-400 uppercase">
              Стоимость и сроки
            </h4>
            <p className="text-sm leading-relaxed opacity-90">
              Поскольку мы объединяем независимые магазины, условия доставки
              определяются <strong>конечным продавцом</strong>. Доставка может
              быть бесплатной в зависимости от условий конкретного бутика или
              суммы заказа.
            </p>
          </div>
        </section>

        <section className="flex gap-6 border border-amber-100 bg-amber-50 p-8">
          <div className="hidden md:block">
            <Info className="text-amber-600" size={24} />
          </div>
          <div>
            <h3 className="mb-2 font-bold text-amber-900 uppercase">
              Обратите внимание
            </h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-amber-800">
              <li>
                При заказе вещей у <strong>разных</strong> продавцов, доставка
                оплачивается отдельно за каждую посылку.
              </li>
              <li>
                Сроки доставки из каждой точки индивидуальны и будут
                подтверждены менеджером.
              </li>
              <li>
                Самовывоз гарантирует наличие выбранной модели и размера в
                магазине к вашему приходу.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-20 text-center">
        <p className="mb-6 text-sm text-zinc-400">
          Остались вопросы по конкретному заказу?
        </p>
        <button className="bg-black px-10 py-4 text-sm font-bold text-white uppercase transition-all hover:bg-zinc-800">
          Связаться с поддержкой
        </button>
      </div>
    </div>
  )
}
