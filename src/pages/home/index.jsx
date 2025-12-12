import NewArrivalSection from '@/components/new-arrivals'
import PopularSection from '@/components/popular'
import CategoriesList from '@/features/category-list/index.jsx'
import HeroSlider from '@/features/hero-slider'
import { useFavoritesStore } from '@/store/favoritesStore.js'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    useFavoritesStore.getState().loadFavorites()
  }, [])

  return (
    <div className='container flex flex-col mx-auto px-1 md:px-4'>
      <HeroSlider />
      <NewArrivalSection />
      <CategoriesList />
      <PopularSection />
    </div>
  )
}
