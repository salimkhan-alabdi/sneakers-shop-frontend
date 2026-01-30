import React, { useState } from "react"; // Добавили useState
import {
  Clock,
  MessageCircle,
  Instagram,
  Navigation,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const ADDRESS = "Ташкент, ул. Паркентская, 283";
  const PHONE = "+998 90 924 87 61";
  const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=41.3086784,69.3372194";

  const LAT = "41.3086784";
  const LNG = "69.3372194";

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="mb-16 border-b border-zinc-200 pb-10">
        <h1 className="text-4xl font-black uppercase mb-6">Контакты</h1>
        <p className="text-zinc-500 mt-4 text-lg font-medium">
          Главный штаб кроссовок в Ташкенте.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-black text-white p-8 shadow-2xl">
            <div className="space-y-10">
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-6">
                  Связаться
                </h3>
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="block group"
                >
                  <p className="text-2xl font-bold group-hover:text-zinc-400 transition-colors">
                    {PHONE}
                  </p>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2 block">
                    Direct Line
                  </span>
                </a>
              </section>

              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-6">
                  Локация
                </h3>
                <p className="text-lg font-bold leading-tight">{ADDRESS}</p>
                <p className="text-xs text-zinc-400 mt-2 uppercase tracking-widest">
                  Ориентир: ул. Паркентская
                </p>
              </section>

              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-6">
                  График
                </h3>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-zinc-500" />
                  <p className="text-lg font-bold">11:00 — 22:00</p>
                </div>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">
                  Без выходных
                </p>
              </section>

              <div className="pt-6 flex gap-3">
                <a
                  href="https://www.instagram.com/kink_uz/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-zinc-800 hover:bg-white hover:text-black py-4 flex justify-center transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://t.me/kink_uz"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-zinc-800 hover:bg-[#229ED9] py-4 flex justify-center transition-all duration-300"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 relative group">
          <div className="h-full min-h-[500px] overflow-hidden border border-zinc-200 shadow-inner relative bg-zinc-100">
            <div className="absolute inset-0 z-0">
              <img
                src="/map.png" // Замените на свое фото магазина или скриншот карты
                alt="Map placeholder"
                className="w-full h-full object-cover"
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
              className={`
                relative z-10 transition-opacity duration-1000 contrast-125 invert-[0.05] filter
                ${isMapLoaded ? "opacity-90 group-hover:opacity-100" : "opacity-0"}
              `}
              title="KINK Location"
            ></iframe>

            <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent z-20">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
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
  );
}
