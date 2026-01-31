import { Link } from "react-router-dom";

export const IconButton = ({ src, alt, onClick, isLink, to }) => {
  const content = <img className="w-6 h-6" src={src} alt={alt} />;
  return isLink ? (
    <Link to={to}>{content}</Link>
  ) : (
    <button onClick={onClick} className="cursor-pointer">
      {content}
    </button>
  );
};
