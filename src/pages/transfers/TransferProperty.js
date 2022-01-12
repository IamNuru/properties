import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import AuthContext from "../../context/auth/AuthContext"
import PropertyContext from "../../context/property/PropertyContext";
import LoadingGear from "../../components/loaders/LoadingGear";
import RecipientProfile from "../../components/RecipientProfile"
import noPropertyImage from "../../images/no-property-image.png"

const TransferProperty = () => {
  const { user, checkIfEmailExist, setRecipientToNull, recipient, setError, errors } = useContext(AuthContext)
  const { getProperty, property, loading,  success, setLoading, setPropertyToNull } = useContext(PropertyContext)

  const [email, setEmail] = useState("");
  const { id } = useParams()

  //fetch details of property about to be fetched
  useEffect(() => {
    
    if(id){
      const getP = async id =>{
        setLoading(true)
        await getProperty(id);
      }
      getP(id)
    }
    
    return () =>{
      setPropertyToNull(null)
      setRecipientToNull()
    }

    //eslint-disable-next-line
  }, [id]);

  const handleMouseLeave = async() =>{
    if (email.length > 0) {
      await checkIfEmailExist(email)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    /* setLoading(true); */
    setError(null)
    if (email === "") {
      setError("Enter receipient Email address")
      setRecipientToNull()
      return false
    }
    if (email === user.email) {
      // setLoading(false)
      setError("Can't Transfer Property to your self");
      setRecipientToNull()
      return false 
    }
    await checkIfEmailExist(email)
    
  };
  return (
    <div className="min-h-screen m-auto max-w-7xl">
      <div className="w-full max-w-4xl mx-auto">
        {loading ? (
          <LoadingGear />
        ) : (
          <>
            {property !== null && Object.keys(property).length !== 0 ? (
              <>
                <div className="w-full text-center py-8 font-medium text-lg">
                  You are about to Transfer your Property:
                </div>
                <div className="w-full pl-4 text-left text-red-400 text-xl font-semibold">
                  {property?.title}
                </div>
                <div className="p-4">
                  <div className="w-full align-center">
                  {
                    property?.photoURL ?
                    <img src={`${property?.photoURL}`} alt="property" className="w-72 h-80 bg-cover border border-gray-200" />
                    :
                    <img src={noPropertyImage} alt="property" className="w-72 h-80 bg-cover border border-gray-200" />
                  }  
                  </div>
                  <div className="p-4 text-md">
                    { property.description }
                  </div>
                  <form onSubmit={handleSubmit} className="block" autoComplete="new-password">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        autoComplete="new-password"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                    {errors && <p className="p-4 text-red-500">{errors}</p>}
                    {success && <p className="p-4 text-green-700">{success}</p>}
                    <button
                      type="submit"
                      className="w-48 bg-blue-400 py-2 px-4 mt-2"
                    >
                      Confirm Transfer
                    </button>
                  </form>
                </div>
                {
                  recipient ? 
                  <RecipientProfile property={property}/>
                  :
                  <p className="text-sm text-center">Click view profile to show recipient profile</p>
                }
              </>
            ) : (
              <>
              <p className="font-semibold text-center text-lg">Property Not Found</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransferProperty;
