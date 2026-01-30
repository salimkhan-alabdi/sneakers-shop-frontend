import React from "react";
import { Truck, Package, Store, Info } from "lucide-react";
export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="mb-16">
        <h1 className="text-4xl font-black uppercase mb-6">
          Доставка и получение
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl">
          KINK.UZ объединяет лучшие магазины Ташкента на одной платформе. Мы
          сделали процесс шоппинга быстрым, прозрачным и мобильным.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 border border-zinc-100 bg-zinc-50">
          <Truck className="mb-4 text-black" size={32} />
          <h3 className="font-bold uppercase mb-2">Курьерская доставка</h3>
          <p className="text-sm text-zinc-600">
            Доставляем заказы прямо до вашей двери по всему Ташкенту и
            Узбекистану.
          </p>
        </div>
        <div className="p-6 border border-zinc-100 bg-zinc-50">
          <Store className="mb-4 text-black" size={32} />
          <h3 className="font-bold uppercase mb-2">Самовывоз</h3>
          <p className="text-sm text-zinc-600">
            Забирайте заказы лично в офлайн-точках наших партнеров после
            подтверждения.
          </p>
        </div>
        <div className="p-6 border border-zinc-100 bg-zinc-50">
          <Package className="mb-4 text-black" size={32} />
          <h3 className="font-bold uppercase mb-2">Контроль качества</h3>
          <p className="text-sm text-zinc-600">
            Реальные фото товаров и система фильтров гарантируют точность вашего
            выбора.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section className="grid md:grid-cols-2 gap-8 items-start border-t border-zinc-100 pt-10">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">
              Как это работает?
            </h2>
            <p className="text-zinc-700 leading-relaxed">
              KINK — это агрегатор более 80 фирменных магазинов. Вы выбираете
              товары, пользуясь удобной навигацией по категориям, размерам и
              ценам, а мы синхронизируем ваш заказ с конкретным продавцом.
            </p>
          </div>
          <div className="bg-zinc-900 text-white p-8">
            <h4 className="font-bold mb-4 uppercase text-sm text-zinc-400">
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

        <section className="bg-amber-50 border border-amber-100 p-8 flex gap-6">
          <div className="hidden md:block">
            <Info className="text-amber-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold uppercase text-amber-900 mb-2">
              Обратите внимание
            </h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2 text-sm">
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
        <p className="text-zinc-400 text-sm mb-6">
          Остались вопросы по конкретному заказу?
        </p>
        <button className="bg-black text-white px-10 py-4 font-bold uppercase text-sm hover:bg-zinc-800 transition-all">
          Связаться с поддержкой
        </button>
      </div>
    </div>
  );
}
