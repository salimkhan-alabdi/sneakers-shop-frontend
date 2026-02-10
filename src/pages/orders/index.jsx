import { useEffect, useState } from 'react'
import { instance } from '@/api/axios'
import Button from '@/components/button/index.jsx'
import { useNavigate, useParams } from 'react-router-dom'

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { lang } = useParams()
  const navigate = useNavigate()

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await instance.get('orders/')
      setOrders(res.data || [])
    } catch (err) {
      console.error(err)
      alert('Ошибка при загрузке заказов')
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (orderId) => {
    console.log('Кнопка нажата! ID заказа:', orderId)
    if (!window.confirm('Вы действительно хотите отменить заказ?')) return

    try {
      const res = await instance.post(`/orders/${orderId}/cancel/`)
      console.log('cancel response', res.data) // <- добавь лог
      alert('Заказ успешно отменён')
      fetchOrders()
    } catch (err) {
      console.error('Cancel error', err)
      alert('Ошибка при отмене заказа')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <div className="p-10 text-center">Загрузка заказов…</div>

  if (orders.length === 0)
    return <div className="p-10 text-center text-gray-500">Заказов нет</div>

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="mb-4 text-2xl font-bold">Мои заказы</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex flex-col">
            <span className="font-semibold">Заказ #{order.id}</span>
            <span className="text-sm text-gray-500">
              Статус: {order.status}
            </span>
            <span className="text-sm text-gray-500">
              Итого: {order.total_price} сум
            </span>
            <span className="text-sm text-gray-400">
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => navigate(`/${lang}/orders/${order.id}`)}
              className="bg-gray-200 px-3 py-1 text-black"
            >
              Подробнее
            </Button>

            {order.status === 'pending' && (
              <Button
                onClick={() => cancelOrder(order.id)}
                className="px-3 py-1 text-white"
              >
                Отменить
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
