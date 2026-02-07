import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavoritesStore } from '@/store/favoritesStore'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import Button from '@/components/button'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const language = useLanguageStore((state) => state.language)
  const { favorites, loadFavorites, toggleFavorite } = useFavoritesStore()
  const [loadingFavorites, setLoadingFavorites] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      await loadFavorites()
      setLoadingFavorites(false)
    }
    fetchFavorites()
  }, [loadFavorites])

  if (loadingFavorites) return <p className='p-10 text-center'>Загрузка...</p>
  if (!favorites || favorites.length === 0)
    return (
      <p className='p-10 text-center text-gray-500'>
        {translations[language]?.noFavorites || 'У вас нет избранных товаров'}
      </p>
    )

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-3xl font-semibold mb-6'>
        {translations[language]?.favorites || 'Избранное'}
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {favorites.map((fav) => {
          const product = fav.product
          if (!product) return null

          return (
            <div
              key={product.id}
              className='border rounded p-3 flex flex-col gap-3'
            >
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-48 object-contain cursor-pointer'
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <div className='flex-1 flex flex-col justify-between'>
                <h2 className='text-lg font-medium'>{product.name}</h2>
                <p className='text-gray-500'>
                  {Math.floor(product.price).toLocaleString()}{' '}
                  {translations[language]?.currency}
                </p>
              </div>

              <Button
                onClick={() => toggleFavorite(product)} // передаём объект, а не id
                className='bg-red-500 text-white'
              >
                {translations[language]?.remove || 'Удалить'}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
