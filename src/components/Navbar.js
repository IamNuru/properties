import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomLink from "./CustomLink.tsx";
import AuthContext from "../context/auth/AuthContext";
import LogoSvg from "./LogoSvg";

const Navbar = () => {
  const location = useLocation()
  const { logout, user } = useContext(AuthContext);
  const [openNavbar, setOpenNavbar] = useState(true);

  useEffect(() => {
    setOpenNavbar(false)
    window.scrollTo(0,0)
  }, [location])

  return (
    <>
      {/* Navbar for smaller screen  */}
      <nav className="sm:hidden fixed top-0 bottom-0 left-0 w-full z-50">
        <div className="bg-gray-800">
          <div className="w-full bg-gray-900 pt-2 pb-4 px-2 flex justify-between">
            <div className="text-indigo-500">
              <Link to="/">
                <LogoSvg h={10} w={10} />
              </Link>
            </div>
            <div className="btn">
              <button
                className="text-white"
                onClick={() => setOpenNavbar(!openNavbar)}
              >
                <i className={`fa ${openNavbar ? 'fa-times':'fa-bars'} fa-2x`}></i>
              </button>
            </div>
          </div>
          <div
            className={`${openNavbar ? "w-full" : "w-0"} absolute flex flex-col flex-grow-1 top-16 h-screen bg-gray-800 text-white font-semibold text-lg overflow-hidden trans-w opacity-90`}
          >
            <div className="px-3 flex flex-col" style={{height :'calc(100% - 4.5rem)'}}>
              <ul
                className="text-xl"
              >
                <CustomLink to="/">Home</CustomLink>
                {user && (
                  <>
                    <CustomLink to="/my-properties">My Properties</CustomLink>
                    <CustomLink to="/add-property">Add Property</CustomLink>
                    
                    <CustomLink to="/profile">Profile</CustomLink>
                  </>
                )}
              </ul>
            <div className="block mt-auto">
              {!user ? (
                <div className="flex flex-col">
                  <Link
                    to="/signup"
                    className="my-2 font-md text-orange-500 hover:bg-orange-900 text-center"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="my-1 font-md text-orange-500 hover:bg-orange-900 text-center"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="">
                  <button
                    onClick={() => logout()}
                    className="font-md text-orange-500 hover:bg-orange-900 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </nav>
      {/* END SMALL SCREEN NAVBAR */}
      <nav className="hidden sm:block bg-gray-800 shadow shadow-gray-600 w-100 px-8 md:px-auto">
        <div
          className={`md:h-16 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap`}
        >
          {/* <!-- Logo --> */}
          <div className="text-indigo-500 md:order-1">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </Link>
          </div>

          <div
            className="text-gray-500 order-3 w-full md:w-auto md:order-2"
          >
            <ul
              className="flex font-semibold justify-center"
            >
              {/* Active Link = text-indigo-500
                Inactive Link = hover:text-indigo-500*/}
              <CustomLink to="/">Home</CustomLink>
              {user && (
                <>
                  <CustomLink to="/my-properties">My Properties</CustomLink>
                  
                  <CustomLink to="/add-property">Add Property</CustomLink>
                </>
              )}
            </ul>
          </div>
          <div className="order-2 md:order-3 flex">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-1 font-semibold hover:bg-indigo-500 hover:text-gray-50 border-2 border-gray-50 text-gray-200 rounded-md text-center md:ml-2"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-1 font-semibold hover:bg-indigo-500 hover:text-gray-50 border-2 border-gray-50 text-gray-200 rounded-md text-center md:ml-2"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-1 font-semibold hover:bg-indigo-500 hover:text-gray-50 border-2 border-gray-50 text-gray-200 rounded-md text-center md:ml-2"
                >
                  Profile
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-4 py-1 font-semibold hover:bg-indigo-500 hover:text-gray-50 border-2 border-gray-50 text-orange-400 rounded-md text-center md:ml-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
