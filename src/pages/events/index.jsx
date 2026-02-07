import { translations } from "@/i18n/translations";
import { useLanguageStore } from "@/store/languageStore";
import React from "react";

export default function EventsPage() {
  const language = useLanguageStore((state) => state.language);
  const t = translations[language];
  const events = [
    {
      id: 1,
      tag: "Конкурс",
      title: "1 день - 1 пара кроссовок.",
      image: "/event1.jpg",
      date: "09.10.2021",
    },
    {
      id: 2,
      tag: "Переезд",
      title: "Наш новый адрес - Ул.Паркент 283.",
      image: "/map.png",
      isMap: true,
    },
    {
      id: 3,
      tag: "Новое поступление",
      title: "Attention Господа Поступили редкие экземпляры.",
      image: "/event3.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h2 className="text-4xl font-black uppercase mb-6">{t.events}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-[#EFEFEF] p-5 flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden mb-6 bg-white">
              <img
                src={event.image}
                alt={event.tag}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="flex flex-col grow">
              <p className="text-sm text-black mb-auto">
                <span className="font-black uppercase">{event.tag}:</span>{" "}
                {event.title}
              </p>

              <div className="mt-8 pt-4 flex justify-end">
                <a
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-widest text-black border-b border-black pb-1 hover:opacity-60 transition-opacity"
                >
                  Читать статью
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
