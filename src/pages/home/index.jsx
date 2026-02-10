import NewArrivalSection from '@/components/new-arrivals'
import PopularSection from '@/components/popular'
import CategoriesList from '@/features/category-list/index.jsx'
import HeroSlider from '@/features/hero-slider'
import { useLanguageStore } from '@/store/languageStore.js'
import { translations } from '@/i18n/translations'

const events = [
  {
    id: 1,
    tag: 'Конкурс',
    title: '1 день - 1 пара кроссовок.',
    image: '/event1.jpg',
    date: '09.10.2021',
  },
  {
    id: 2,
    tag: 'Переезд',
    title: 'Наш новый адрес - Ул.Паркент 283.',
    image: '/map.png',
    isMap: true,
  },
  {
    id: 3,
    tag: 'Новое поступление',
    title: 'Attention Господа Поступили редкие экземпляры.',
    image: '/event3.jpg',
    date: '09.10.2021',
  },
]

export default function Home() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]

  return (
    <div className="container mx-auto flex flex-col px-1 md:px-4">
      <HeroSlider />
      <NewArrivalSection />
      <CategoriesList />
      <PopularSection />
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6">{t.events}</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex h-full flex-col bg-[#EFEFEF] p-5"
            >
              <div className="relative mb-6 aspect-square overflow-hidden bg-white">
                <img
                  src={event.image}
                  alt={event.tag}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex grow flex-col">
                <p className="mb-auto text-sm text-black">
                  <span className="font-black uppercase">{event.tag}:</span>{' '}
                  {event.title}
                </p>

                <div className="mt-8 flex justify-end pt-4">
                  <a
                    href="#"
                    className="border-b border-black pb-1 text-[10px] font-bold tracking-widest text-black uppercase transition-opacity hover:opacity-60"
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
  )
}
