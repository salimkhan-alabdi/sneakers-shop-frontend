import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "@/api/axios";
import Button from "@/components/button/index.jsx";

export default function OrderDetails() {
  const { id, lang } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/orders/${id}/`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      alert("Ошибка при загрузке заказа");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm("Вы действительно хотите отменить заказ?")) return;

    try {
      await instance.post(`/orders/${id}/cancel/`);
      alert("Заказ успешно отменён");
      fetchOrder();
    } catch (err) {
      console.error(err);
      alert("Ошибка при отмене заказа");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Загрузка заказа…</div>;

  if (!order)
    return (
      <div className="p-10 text-center text-gray-500">Заказ не найден</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Заказ #{order.id}</h1>

      <div className="flex justify-between">
        <div className="space-y-1">
          <p>
            <strong>Статус:</strong> {order.status}
          </p>
          <p>
            <strong>Дата:</strong>{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Итого:</strong> {order.total_price} сум
          </p>
          <p>
            <strong>Способ оплаты:</strong> {order.payment_method}
          </p>
          <p>
            <strong>Адрес:</strong> {order.address}, {order.city},{" "}
            {order.region}, {order.postal_code}
          </p>
          {order.note && (
            <p>
              <strong>Заметка:</strong> {order.note}
            </p>
          )}
        </div>
        {order.status === "pending" && (
          <Button
            onClick={cancelOrder}
            className="px-4 py-2 bg-red-500 text-white"
          >
            Отменить заказ
          </Button>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-6">Товары в заказе</h2>
      <div className="space-y-4">
        {order.items.map((item) => {
          const mainImage =
            item.product.images?.find((img) => img.is_main)?.image ||
            item.product.images?.[0]?.image ||
            "/placeholder.png";

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${mainImage}`}
                alt={item.product.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                {item.size && (
                  <p>
                    Размер:{" "}
                    {typeof item.size === "object"
                      ? item.size.size || item.size.id
                      : item.size}
                  </p>
                )}
                <p>Количество: {item.quantity}</p>
                <p>Цена: {item.price} сум</p>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={() => navigate(`/${lang}/orders`)} className="mt-6">
        Назад к заказам
      </Button>
    </div>
  );
}
