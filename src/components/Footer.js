import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Footer = () => {
  const { user } = React.useContext(AuthContext)
  return (
    <div className="mt-4 bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="mt-18 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            &copy; Preferental test project.
          </p>
          <div className="order-1 md:order-2">
            <Link to="/" className="px-2">Home</Link>
            {
              !user && <>
              <Link to="/login" className="px-2 border-l">Login</Link>
              <Link to="/signup" className="px-2 border-l">Sign Up</Link>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
