export const CartButton = ({ count, onClick }) => (
  <button className="relative cursor-pointer" onClick={onClick}>
    <img className="w-6 h-6" src="/icons/bag.svg" alt="bag" />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
        {count}
      </span>
    )}
  </button>
);
