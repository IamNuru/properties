import { useEffect, useContext } from "react";
import { Link , useParams } from "react-router-dom";
import LoadingGear from "../../components/loaders/LoadingGear";
import PropertyContext from "../../context/property/PropertyContext"
import noPropertyImage from "../../images/no-property-image.png"


const PropertyDetails = () => {
  const { loading, getProperty, property,  setPropertyToNull, deleteProperty, setLoading } = useContext(PropertyContext)
  const { id } = useParams()

  //fetch details of property about to be fetched
  useEffect(() => {
    if(id){
      const getP = async id =>{
        setLoading(true);
        await getProperty(id);
      }
      getP(id)
    }
    
    return () =>{
      setPropertyToNull(null)
    }

    //eslint-disable-next-line
  }, [id]);



  return (
    <div className="m-auto min-h-screen max-w-7xl">
      <div className="w-full max-w-4xl mx-auto">
        {loading ? (
          <LoadingGear />
        ) : (
          <>
            {property !== null && Object.keys(property).length !== 0 ? (
              <>
                <div className="w-full text-center py-8 font-medium text-lg">
                  { property.title }
                </div>
                <div className="p-4">
                  <div className="w-full flex">
                  <Link
                      to={`/transfer/${property?.id}`}
                      className="ml-auto mb-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded-xs text-md"
                    >
                      Transfer Property
                    </Link>
                  </div>
                  <div className="w-full items-center">
                  {
                    property?.photoURL ?
                    <img src={`${property?.photoURL}`} alt="property" className="w-72 h-80 bg-cover border border-gray-200" />
                    :
                    <img src={noPropertyImage} alt="property" className="w-72 h-80 bg-cover border border-gray-200" />
                  }
                  </div>
                  <div className="p-4 text-md">
                    {property.description}
                  </div>
                  <div className="w-full border border-gray-300 rounded-md bg-red-50 py-4 px-2 md:px-4 mt-4 grid gap-2 py-4 md:flex md:justify-between">
                    <button
                        onClick={() => deleteProperty(id)}
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-medium px-4 py-1 rounded-xs text-md"
                      >
                        Delete
                      </button>
                    <Link
                      to={`/edit-property/${id}`}
                      className="text-center bg-green-500 hover:bg-green-700 text-white font-medium px-4 py-1 rounded-xs text-md"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold text-center text-lg">
                  Property Not Found
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
