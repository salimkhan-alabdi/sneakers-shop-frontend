import { Link } from 'react-router-dom'

export const IconButton = ({ src, alt, onClick, isLink, to }) => {
  const content = <img className="h-6 w-6" src={src} alt={alt} />
  return isLink ? (
    <Link to={to}>{content}</Link>
  ) : (
    <button onClick={onClick} className="cursor-pointer">
      {content}
    </button>
  )
}
