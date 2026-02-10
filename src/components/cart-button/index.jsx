export const CartButton = ({ count, onClick }) => (
  <button className="relative cursor-pointer" onClick={onClick}>
    <img className="h-6 w-6" src="/icons/bag.svg" alt="bag" />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] text-white">
        {count}
      </span>
    )}
  </button>
)
