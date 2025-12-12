import { useState, useEffect } from 'react'
import { api } from '@/api'
import ProductCard from '@/components/product-card'
import { useLanguageStore } from '@/store/languageStore.js'
import { translations } from '@/i18n/translations'

export default function NewArrival() {
  const [products, setProducts] = useState([])
  const language = useLanguageStore((state) => state.language)

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products/')
      setProducts(response.data)
    }

    loadProducts()
  }, [])

  const newProducts = products.filter((p) => p.is_new)
  const t = translations[language]

  return (
    <main className='container mx-auto max-w-7xl px-1 md:px-4'>
      <h2 className='mb-6'>{t.new}</h2>

      <div className='grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3'>
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
