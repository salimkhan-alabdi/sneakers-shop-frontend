import { translations } from "@/i18n/translations";
import { useLanguageStore } from "@/store/languageStore";
import React from "react";

export default function AboutPage() {
  const language = useLanguageStore((state) => state.language);
  const t = translations[language];
  const brands = [
    "Reebok",
    "Adidas",
    "Vans",
    "Calvin Klein",
    "New Era",
    "New Balance",
    "Puma",
    "Under Armour",
    "Amiri",
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <header className="mb-16 border-b border-zinc-200 pb-10">
        <h1 className="text-4xl font-black uppercase mb-6">{t.about}</h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-zinc-500 text-lg md:text-xl max-w-xl leading-snug">
            Мы объединяем наследие спортивных гигантов и дерзость современных
            люксовых домов. Твоя точка доступа к лучшим дропам планеты.
          </p>
          <span className="text-xs font-mono bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Since 2024
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-7 space-y-8 text-zinc-800 text-lg leading-relaxed">
          <p>
            <strong className="font-bold uppercase text-black">KINK</strong> —
            это не просто ритейл-проект. Это селекция, основанная на глубоком
            понимании сникер-культуры. Мы верим, что обувь — это фундамент
            образа, будь то архивные силуэты{" "}
            <span className="underline decoration-zinc-300">New Balance</span>{" "}
            или премиальный деним от{" "}
            <span className="underline decoration-zinc-300">Amiri</span>.
          </p>
          <p>
            В нашем ростере — только тяжеловесы индустрии. От технологичных
            решений <span className="font-medium text-black">Under Armour</span>{" "}
            и футбольной классики{" "}
            <span className="font-medium text-black">Adidas</span> до
            скейт-культуры <span className="font-medium text-black">Vans</span>.
            Мы гарантируем 100% подлинность каждой вещи, проходя через
            многоэтапную проверку перед отправкой.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative group">
            <img
              className="w-full shadow-2xl"
              src="/kinkloc.jpg"
              alt="KINK Location"
            />
            <div className="absolute inset-0 border border-black/10 pointer-events-none rounded-lg"></div>
          </div>
        </div>
      </div>

      <section className="pt-16 border-t border-zinc-100">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-10 text-center">
          Официальные бренды / Партнеры
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 items-center">
          {brands.map((brand) => (
            <div key={brand} className="flex justify-center">
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-gray-500 hover:text-black cursor-default transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
