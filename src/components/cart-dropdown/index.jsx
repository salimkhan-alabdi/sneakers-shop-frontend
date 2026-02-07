import Button from "../button";

export const CartDropdown = ({
  items,
  language,
  favoritesCount,
  navigate,
  onClose,
  cartEmpty,
  saved,
  orders,
}) => (
  <div className="absolute right-0 top-full mt-3 bg-white shadow-lg border w-72 z-50 p-3 flex flex-col gap-3">
    {items.length === 0 ? (
      <p className="text-center text-gray-400 py-2">{cartEmpty}</p>
    ) : (
      <>
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b pb-4">
            <img
              src={
                item.product.images?.find((img) => img.is_main)?.image ||
                item.product.images?.[0]?.image ||
                "/placeholder.png"
              }
              alt={item.product.name}
              className="w-16 h-16 object-contain"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold line-clamp-1">
                {item.product.name}
              </span>
              <span className="text-gray-500">
                Размер:{" "}
                {typeof item.size === "object"
                  ? item.size.size || "—"
                  : item.size}
              </span>
              <span>Кол-во: {item.quantity}</span>
            </div>
          </div>
        ))}
        {items.length > 3 && (
          <p className="text-xs text-center text-gray-500">
            Еще {items.length - 3} товара в корзине
          </p>
        )}
      </>
    )}

    {/* Ссылки на Избранное и Заказы */}
    <div className="flex flex-col gap-2">
      <div
        onClick={() => {
          navigate(`/${language}/favorites`);
          onClose();
        }}
        className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition"
      >
        <img className="w-6 h-6" src="/icons/save2.svg" alt="save" />
        <span className="text-sm underline">
          {saved} ({favoritesCount})
        </span>
      </div>

      <div
        onClick={() => {
          navigate(`/${language}/order`);
          onClose();
        }}
        className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition"
      >
        <img className="w-6 h-6" src="/icons/box.svg" alt="orders" />
        <span className="text-sm underline">{orders}</span>
      </div>
    </div>

    {items.length > 0 && (
      <Button
        onClick={() => {
          navigate(`/${language}/cart`);
          onClose();
        }}
        className="mt-2 py-2 bg-black text-white w-full text-sm"
      >
        Открыть корзину
      </Button>
    )}
  </div>
);
