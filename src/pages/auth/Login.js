import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import LogoSvg from "../../components/LogoSvg";
import AuthContext from "../../context/auth/AuthContext"

const Login = () => {
  const { login, user, signUpWithEmail, signUpWithFacebook } = React.useContext(AuthContext);

  const navigate = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || "/";


  React.useEffect(() => {
     if(user){
      navigate("/");
    }
    //eslint-disable-next-line
    }, [user])



  const [error, setError] = React.useState(null)
  const [credentials, setCredentials] = React.useState({ email:'', password:'' })

  const { email, password } = credentials;
  const onChange = e => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
    setError(null)
  }


  const handleSubmit = async e =>{
    e.preventDefault()
    if (email === '' || password === '') {
      return setError('All fields are Required')
    }
    try {
      setError(null)
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setError('Invalid Credentials')
    }
  }

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
      { !user ?
      <div className="overflow-hidden bg-white rounded-md shadow-lg w-full sm:max-w-md">
        <div className="text-indigo-500 w-full flex items-center justify-center">
          <Link to="/">
            <LogoSvg h={40} w={40} />
          </Link>
        </div>
        <div className="p-5 bg-white">
          <h3 className="mb-4 text-2xl font-medium text-gray-700 text-center">
            Account Login
          </h3>
          { error && <p className="text-red-400 font-lighter text-sm text-center mb-4">
              {error}
            </p>
          }
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                id="email"
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <Link to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                name="password"
                onChange={onChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
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
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link to="/signup" className="underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
      :
      <div className="min-h-screen flex justify-center items-center">
        Already logged in. Redirecting...
      </div>
    }
    </div>
  )
  ;
};

export default Login;
