import NewArrivalSection from "@/components/new-arrivals";
import PopularSection from "@/components/popular";
import CategoriesList from "@/features/category-list/index.jsx";
import HeroSlider from "@/features/hero-slider";
import { useFavoritesStore } from "@/store/favoritesStore.js";
import { useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore.js";
import { translations } from "@/i18n/translations";

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

export default function Home() {
  const language = useLanguageStore((state) => state.language);
  const t = translations[language];

  useEffect(() => {
    useFavoritesStore.getState().loadFavorites();
  }, []);

  return (
    <div className="container flex flex-col mx-auto px-1 md:px-4">
      <HeroSlider />
      <NewArrivalSection />
      <CategoriesList />
      <PopularSection />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="mb-6">{t.events}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#EFEFEF] p-5 flex flex-col h-full"
            >
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
    </div>
  );
}
