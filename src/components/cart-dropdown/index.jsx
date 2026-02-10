import Button from '../button'

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
  <div className="absolute top-full right-0 z-50 mt-3 flex w-72 flex-col gap-3 border bg-white p-3 shadow-lg">
    {items.length === 0 ? (
      <p className="py-2 text-center text-gray-400">{cartEmpty}</p>
    ) : (
      <>
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b pb-4">
            <img
              src={
                item.product.images?.find((img) => img.is_main)?.image ||
                item.product.images?.[0]?.image ||
                '/placeholder.png'
              }
              alt={item.product.name}
              className="h-16 w-16 object-contain"
            />
            <div className="flex flex-col text-sm">
              <span className="line-clamp-1 font-semibold">
                {item.product.name}
              </span>
              <span className="text-gray-500">
                Размер:{' '}
                {typeof item.size === 'object'
                  ? item.size.size || '—'
                  : item.size}
              </span>
              <span>Кол-во: {item.quantity}</span>
            </div>
          </div>
        ))}
        {items.length > 3 && (
          <p className="text-center text-xs text-gray-500">
            Еще {items.length - 3} товара в корзине
          </p>
        )}
      </>
    )}

    {/* Ссылки на Избранное и Заказы */}
    <div className="flex flex-col gap-2">
      <div
        onClick={() => {
          navigate(`/${language}/favorites`)
          onClose()
        }}
        className="flex cursor-pointer items-center gap-3 transition hover:opacity-70"
      >
        <img className="h-6 w-6" src="/icons/save2.svg" alt="save" />
        <span className="text-sm underline">
          {saved} ({favoritesCount})
        </span>
      </div>

      <div
        onClick={() => {
          navigate(`/${language}/order`)
          onClose()
        }}
        className="flex cursor-pointer items-center gap-3 transition hover:opacity-70"
      >
        <img className="h-6 w-6" src="/icons/box.svg" alt="orders" />
        <span className="text-sm underline">{orders}</span>
      </div>
    </div>

    {items.length > 0 && (
      <Button
        onClick={() => {
          navigate(`/${language}/cart`)
          onClose()
        }}
        className="mt-2 w-full bg-black py-2 text-sm text-white"
      >
        Открыть корзину
      </Button>
    )}
  </div>
)
