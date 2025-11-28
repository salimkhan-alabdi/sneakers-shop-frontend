import { useState, useEffect } from 'react'
import { api } from '@/api'
import Button from '@/components/button'

export default function PopularList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('products/')
        console.log('API data:', response.data)

        setProducts(response.data)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    loadProducts()
  }, [])
  const newProducts = products.filter((p) => p.is_popular).slice(0, 10)

  return (
    <main className='container mt-24 mx-auto max-w-7xl'>
      <h2 className='mb-6'>Чаще всего покупают</h2>
      <div className='grid grid-cols-5 gap-3'>
        {newProducts.map((product) => {
          const mainImage =
            product.images.find((i) => i.is_main) || product.images[0]

          return (
            <div key={product.id} className='p-3 bg-gray-50 max-w-[250px]'>
              <div className='h-[150px] flex items-center'>
                <div className='w-[220px] flex overflow-hidden'>
                  <img
                    className='object-cover'
                    src={`http://127.0.0.1:8000/${mainImage.image}`}
                    alt={product.name}
                  />
                </div>
              </div>
              <span className='text-xs text-white bg-gray-300 rounded-xs px-1'>
                &#x2022; {product.brand.name} &#x2022;
              </span>
              <h3 className='text-sm truncate'>{product.name}</h3>
              <span className='flex my-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <img className='w-4' key={i} src='star.svg' alt='star' />
                ))}
              </span>
              <span className='flex justify-between items-end mb-2'>
                <span className='text-xl font-medium'>
                  {Math.floor(product.price).toLocaleString()} сум
                </span>
                <span className='text-sm'>
                  {product.sizes[0].size}-{product.sizes.slice(-1)[0].size}
                </span>
              </span>
              <Button>Добавить в корзину</Button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
