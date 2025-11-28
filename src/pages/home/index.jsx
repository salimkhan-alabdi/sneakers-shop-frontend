import NewArrivalSection from '@/components/new-arrivals/index.jsx'
import PopularSection from '@/components/popular/index.jsx'
import HeroSlider from '@/features/hero-slider'
import React from 'react'

export default function Home() {
  return (
    <div className='container flex flex-col mx-auto px-1 md:px-4'>
      <HeroSlider />
      <NewArrivalSection />
      <PopularSection />
    </div>
  )
}
