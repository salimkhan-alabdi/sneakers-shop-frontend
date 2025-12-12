import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore.js'
import Button from '@/components/button/index.jsx'

function Cart() {
  const { items, fetchCart, updateItem, removeItem, clearCart } = useCartStore()

  useEffect(() => {
    fetchCart()
  }, [])

  const totalPrice = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  )

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Корзина</h1>

      {items.length === 0 ? (
        <p className='text-gray-500 text-lg'>Ваша корзина пуста</p>
      ) : (
        <div className='space-y-4'>
          {items.map((item) => {
            // Получаем главное изображение
            const mainImage =
              item.product.images.find((img) => img.is_main)?.image ||
              item.product.images[0]?.image ||
              '/placeholder.png'

            // Находим объект размера
            const sizeInfo = item.product.sizes.find(
              (s) => s.id === item.size?.id || s.size === item.size?.size
            )
            const stock = sizeInfo?.stock ?? 0
            const sizeLabel = sizeInfo?.size

            const handleIncrease = () => {
              if (item.quantity < stock) {
                updateItem(item.id, item.quantity + 1)
              }
            }
            const handleDecrease = () => {
              updateItem(item.id, Math.max(item.quantity - 1, 1))
            }
            console.log('sizeLabel:', sizeLabel)
            console.log('stock:', sizeLabel?.stock)
            console.log('item.quantity:', item.quantity)
            return (
              <div
                key={item.id}
                className='flex items-center justify-between p-4 border'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={`http://127.0.0.1:8000${mainImage}`}
                    alt={item.product.name}
                    className='w-20 h-20 object-contain'
                  />
                  <div>
                    <p className='font-semibold'>{item.product.name}</p>
                    <p className='text-gray-500'>{item.product.price} сум</p>
                    <p className='text-sm text-gray-400'>
                      Размер: {sizeLabel} | В наличии:{' '}
                      {stock - item.quantity > 0 ? stock - item.quantity : 0}{' '}
                      шт.
                      {stock - item.quantity <= 0 && ' — больше нет в наличии'}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={handleDecrease}
                    className='px-3 py-1 border hover:bg-gray-100'
                  >
                    −
                  </button>
                  <span className='px-2'>{item.quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className='px-3 py-1 border hover:bg-gray-100'
                    disabled={item.quantity >= stock}
                  >
                    +
                  </button>
                  <Button onClick={() => removeItem(item.id)}>Удалить</Button>
                </div>
              </div>
            )
          })}

          <div className='flex justify-between items-center mt-6 p-4 border-t'>
            <p className='text-lg font-semibold'>Итого:</p>
            <p className='text-lg font-bold'>{totalPrice} сум</p>
          </div>

          <button
            onClick={clearCart}
            className='w-full py-2 bg- border text-black mt-4 cursor-pointer'
          >
            Очистить корзину
          </button>

          <Button className='w-full py-2 bg-black text-white rounded hover:bg-gray-900 mt-2'>
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
