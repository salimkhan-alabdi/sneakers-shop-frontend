import { cn } from '@/utils/cn'

const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-md w-full cursor-pointer border-2 border-black bg-black py-3 text-white hover:bg-black/90 active:bg-white active:text-black',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
