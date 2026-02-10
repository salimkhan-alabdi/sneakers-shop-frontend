import ProductCard from '@/components/product-card/index.jsx'
import React from 'react'
import { useLanguageStore } from '@/store/languageStore.js'
import { translations } from '@/i18n/translations'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import { useProducts } from '@/hooks/useProducts'

export default function WomensPage() {
  const { data: products, isLoading } = useProducts('products/')

  const language = useLanguageStore((state) => state.language)

  const t = translations[language]
  return (
    <main className="container mx-auto max-w-7xl px-1 md:px-4">
      <h2 className="mb-6">{t.women}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products
              .filter((p) => p.gender === 'female')
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>
    </main>
  )
}
