const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-black text-md text-white w-full py-3 border-2 border-black hover:bg-black/90 active:bg-white active:text-black cursor-pointer'
    >
      {children}
    </button>
  )
}

export default Button
