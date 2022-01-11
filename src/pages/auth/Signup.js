import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSvg from "../../components/LogoSvg";
import AuthContext from "../../context/auth/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { register, user, signUpWithEmail, signUpWithFacebook } = React.useContext(AuthContext);
  //initialise state values
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    password_confirmation: "",
  });

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }

    // eslint-disable-next-line
  }, [user]);

  const { fullName, email, phoneNumber, password, password_confirmation } =
    credentials;

  //on form input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null);
  };

  //when the submit button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      email === "" ||
      phoneNumber === "" ||
      password === ""
    ) {
      return setError("Fields marked * cannot be empty");
    }
    if (password !== password_confirmation) {
      return setError("Password do not match");
    }
    if (password.length < 6) {
      return setError("Password should be at least 6 characters");
    }

    try {
      setError(null);
      await register(credentials);
    } catch (error) {
      setError(
        "Oppps!!.. Something went wrong. Failed to create an account!!!"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl md:w-1/3 max-w-md">
        <div className="text-indigo-500 w-full flex items-center justify-center">
          <Link to="/">
            <LogoSvg h={40} w={40} />
          </Link>
        </div>
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Create an Account
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800 text-center">
          Enter your credentials to create an account
        </div>
        {error !== null && error !== "" && (
          <div className="mt-2 text-center sm:text-sm text-red-400 text-lighter transition duration-150  ease-in">
            {error}
          </div>
        )}
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="name"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                Name: <span className="text-red-500 font-light">*</span>
              </label>
              <div className="relative">
                <div className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fa fa-user text-blue-500"></i>
                </div>

                <input
                  type="text"
                  name="fullName"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
                <span className="text-red-500 font-light">*</span>
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fa fa-at text-blue-500"></i>
                </div>

                <input
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="phoneNumber"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                Cellphone Number:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fa fa-phone text-blue-500"></i>
                </div>

                <input
                  type="text"
                  name="phoneNumber"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your cellphone Number"
                  value={phoneNumber}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:<span className="text-red-500 font-light">*</span>
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <i className="fa fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  type="password"
                  name="password"
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="confirmPassword"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Confirm Password:
                <span className="text-red-500 font-light">*</span>
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <i className="fa fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  type="password"
                  name="password_confirmation"
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Confirm your password"
                  value={password_confirmation}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className={`flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 
                  w-full transition duration-150  ease-in ${
                    error
                      ? "cursor-not-allowed bg-gray-500 hover:bg-gray-600"
                      : ""
                  }`}
                disabled={error ? true : false}
              >
                <span className="mr-2 uppercase">Sign Up</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-5 mt-4">
            <span className="flex items-center justify-center space-x-2 my-4">
              <span className="h-px bg-gray-400 w-14"></span>
              <span className="font-normal text-gray-500">or Signup with</span>
              <span className="h-px bg-gray-400 w-14"></span>
            </span>
            <div className="flex flex-col space-y-4">
              <button onClick={() => signUpWithEmail()} className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-red-800 rounded-md group hover:bg-red-400 focus:outline-none">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-800 fill-current group-hover:text-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
                    ></path>
                  </svg>
                </span>
                <span className="text-sm font-medium text-red-800 group-hover:text-white">
                  Email
                </span>
              </button>
              <button onClick={() => signUpWithFacebook()} className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
                <span>
                  <svg
                    className="text-blue-500 group-hover:text-white"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </span>
                <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                  Facebook
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span className="ml-2">
          You have an account?
          <Link
            to="/login"
            className="text-xs ml-2 text-blue-500 font-semibold"
          >
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
