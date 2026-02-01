import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "@/store/cartStore.js";
import { instance } from "@/api/axios.js";
import Button from "@/components/button/index.jsx";

export default function OrderPage() {
  const { items, fetchCart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const { lang } = useParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postal_code: "",
    payment_method: "cash",
    note: "",
  });

  const DELIVERY_PRICE = 25000;

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  const totalPrice = subtotal + DELIVERY_PRICE;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return alert("Корзина пуста");

    setLoading(true);

    try {
      const payload = {
        ...form,
        delivery_price: DELIVERY_PRICE,
        items: items.map((item) => ({
          product_id: item.product.id,
          size:
            typeof item.size === "object"
              ? item.size.size || item.size.id
              : item.size,
          quantity: item.quantity,
        })),
      };

      const { data } = await instance.post("/orders/create/", payload);
      console.log("Ответ сервера при создании заказа:", data);

      clearCart();
      navigate(`/${lang}/orders/${data.order.id}`);
    } catch (err) {
      console.error(err);
      alert("Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="full_name"
            placeholder="ФИО"
            className="border p-3"
            required
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Телефон"
            className="border p-3"
            required
            onChange={handleChange}
          />
        </div>

        {/* ADDRESS */}
        <input
          name="address"
          placeholder="Адрес"
          className="border p-3 w-full"
          required
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="city"
            placeholder="Город"
            className="border p-3"
            required
            onChange={handleChange}
          />
          <input
            name="region"
            placeholder="Регион"
            className="border p-3"
            required
            onChange={handleChange}
          />
          <input
            name="postal_code"
            placeholder="Почтовый индекс"
            className="border p-3"
            onChange={handleChange}
          />
        </div>

        {/* PAYMENT */}
        <div>
          <p className="font-semibold mb-2">Способ оплаты</p>
          <select
            name="payment_method"
            className="border p-3 w-full"
            onChange={handleChange}
          >
            <option value="cash">Наличными при получении</option>
            <option value="card">Картой</option>
          </select>
        </div>

        {/* NOTE */}
        <textarea
          name="note"
          placeholder="Комментарий к заказу"
          className="border p-3 w-full"
          rows={3}
          onChange={handleChange}
        />
        {/* ORDER ITEMS */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Товары</h2>

          {items.map((item) => {
            const mainImage =
              item.product.images.find((img) => img.is_main)?.image ||
              item.product.images[0]?.image ||
              "/placeholder.png";

            const sizeLabel =
              typeof item.size === "object"
                ? item.size.size || item.size.id
                : item.size;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={mainImage}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain"
                  />

                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    {sizeLabel && (
                      <p className="text-sm text-gray-500">
                        Размер: {sizeLabel}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {item.product.price} сум
                    </p>
                  </div>
                </div>

                <div className="text-sm font-semibold">× {item.quantity}</div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Товары</span>
            <span>{subtotal} сум</span>
          </div>
          <div className="flex justify-between">
            <span>Доставка</span>
            <span>{DELIVERY_PRICE} сум</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Итого</span>
            <span>{totalPrice} сум</span>
          </div>
        </div>

        <Button disabled={loading} className="w-full py-3 bg-black text-white">
          {loading ? "Оформляем..." : "Подтвердить заказ"}
        </Button>
      </form>
    </div>
  );
}
