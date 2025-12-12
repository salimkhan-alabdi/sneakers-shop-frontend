import { api } from '@/api'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product-card'
import { useLanguageStore } from '@/store/languageStore.js'
import { translations } from '@/i18n/translations'

export default function MensPage() {
  const [products, setProducts] = useState([])
  const language = useLanguageStore((state) => state.language)
  useEffect(() => {
    async function loadData() {
      const res = await api.get('products/')
      setProducts(res.data)
    }
    loadData()
  }, [])

  return (
    <main className='container mx-auto max-w-7xl px-1 md:px-4'>
      <h2 className='mb-6 text-2xl font-bold'>
        <h2 className='mb-6'>{translations[language].men}</h2>
      </h2>

      <div className='grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3'>
        {products
          .filter((p) => p.gender === 'male')
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </main>
  )
}
