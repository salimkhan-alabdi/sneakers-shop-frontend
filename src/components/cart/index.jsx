import { useCart } from '@/hooks/useCart'
import Button from '@/components/button/index.jsx'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { cartItems: items, updateItem, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  const totalPrice = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  )

  const handleCheckout = () => {
    navigate('/order') // <-- переход на страницу order
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Корзина</h1>

      {items.length === 0 ? (
        <p className="text-lg text-gray-500">Ваша корзина пуста</p>
      ) : (
        <div className="space-y-4">
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
                updateItem({ id: item.id, quantity: item.quantity + 1 })
              }
            }
            const handleDecrease = () => {
              updateItem({ id: item.id, quantity: Math.max(item.quantity - 1, 1) })
            }

            return (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={mainImage}
                    alt={item.product.name}
                    className="h-20 w-20 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-gray-500">{item.product.price} сум</p>
                    <p className="text-sm text-gray-400">
                      Размер: {sizeLabel} | В наличии:{' '}
                      {stock - item.quantity > 0 ? stock - item.quantity : 0}{' '}
                      шт.
                      {stock - item.quantity <= 0 && ' — больше нет в наличии'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrease}
                    className="border px-3 py-1 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="border px-3 py-1 hover:bg-gray-100"
                    disabled={item.quantity >= stock}
                  >
                    +
                  </button>
                  <Button onClick={() => removeItem(item.id)}>Удалить</Button>
                </div>
              </div>
            )
          })}

          <div className="mt-6 flex items-center justify-between border-t p-4">
            <p className="text-lg font-semibold">Итого:</p>
            <p className="text-lg font-bold">{totalPrice} сум</p>
          </div>

          <button
            onClick={clearCart}
            className="bg- mt-4 w-full cursor-pointer border py-2 text-black"
          >
            Очистить корзину
          </button>

          <Button
            onClick={handleCheckout}
            className="mt-2 w-full rounded bg-black py-2 text-white hover:bg-gray-900"
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
