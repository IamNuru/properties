import { useState , useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext"
import InlineLoadingGear from "../../components/loaders/InlineLoadingGear"

const ForgotPassword = () => {
  const { resetPassword, user, success, errors, setError, setSuccessToNull, loading, setLoading} = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")


  useEffect(() => {
    if(user){
      navigate('/')
    }

    return () =>{
      setSuccessToNull()
    }
    
    //eslint-disable-next-line
  }, [user])

  
  const handlePasswordReset = async (e) =>{
    e.preventDefault()
    setError(null)
    setSuccessToNull()
    setLoading(true)
    if (email === '') {
      return setError('Email field is required')
    }
    resetPassword(email)
  }


  return (
    <div className="container mx-auto sm:p-8 bg-gray-100">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full">
          <div className="w-full lg:w-1/3 bg-white p-5 rounded-lg lg:rounded-l-none m-auto shadow-md">
            <div className="sm:px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
              { success && 
                <p className="w-full bg-green-100 rounded-md p-2 text-center my-1 text-md text-green-500">
                {success}
                </p>
              }
              { errors && 
                <p className="bg-red-100 rounded-md p-2 text-center my-1 text-md text-red-500">
                { errors }
                </p>
              }
            </div>
            <form onSubmit={handlePasswordReset} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter Email Address..."
                />
              </div>
              {
                loading && <div className="w-full flex flex-col justify-center items-center">
                  <div className="w-full text-center text-sm">Please Wait...</div>
                  <InlineLoadingGear />
                </div>
              }
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link to="/signup"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Create an Account!
                </Link>
              </div>
              <div className="text-center">
                <Link to="/login"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
