import { useResolvedPath, useMatch, Link } from "react-router-dom"
import type { LinkProps } from "react-router-dom"

const CustomLink = ({ children, to, ...props }: LinkProps) =>{
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <li className={`py-2 sm:px-4 sm:py-2 hover:text-indigo-400 ${match ? 'sm:text-indigo-500' : 'sm:text-gray-200'}`}>
        <Link
          to={to}
          {...props}
        >
          {children}
        </Link>
      </li>
    );
  }

  export default CustomLink;