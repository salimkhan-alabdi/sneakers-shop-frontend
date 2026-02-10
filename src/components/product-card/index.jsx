import { Link } from 'react-router-dom'
import { translations } from '@/i18n/translations'
import { useLanguageStore } from '@/store/languageStore.js'

export default function ProductCard({ product }) {
  const language = useLanguageStore((state) => state.language)

  const mainImage = product.images.find((i) => i.is_main) || product.images[0]
  const displayImage = mainImage ? `${mainImage.image}` : '/placeholder.png'

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden bg-gray-50"
    >
      <div className="flex h-full flex-col p-3">
        <div className="flex flex-1 flex-col">
          <div className="relative mb-3 flex h-[200px] w-full items-center justify-center overflow-hidden">
            <img
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              src={displayImage}
              alt={product.name}
            />
          </div>

          <span className="text-xs font-semibold tracking-wide text-gray-400">
            {product.brand?.name}
          </span>

          <h3 className="mt-1 mb-2 line-clamp-2 min-h-[2.5em] text-sm leading-tight font-semibold text-gray-900">
            {product.name}
          </h3>

          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => {
              const isFilled = i + 1 <= Math.round(product.rating || 0)

              return (
                <img
                  className={`size-3.5 ${isFilled ? '' : 'opacity-30 grayscale'}`}
                  key={i}
                  src="/star.svg"
                  alt="star"
                />
              )
            })}
            <span className="ml-1 text-xs text-gray-400">
              ({product.rating})
            </span>
          </div>

          <div className="mt-auto flex flex-col items-end justify-between border-t border-dashed border-gray-100 pt-2 sm:flex-row">
            <span className="text-lg font-bold text-gray-900">
              {Math.floor(product.price).toLocaleString()}{' '}
              <span className="text-xs font-semibold text-gray-500">
                {translations[language]?.currency}
              </span>
            </span>
            {product.sizes?.length > 0 && (
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
                {product.sizes[0].size}-{product.sizes.slice(-1)[0].size}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
