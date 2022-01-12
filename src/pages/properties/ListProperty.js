import React from "react"
import Property from "../../components/properties/Property";
import ListPulse from "../../components/loaders/ListPulse";
import PropertyContext from "../../context/property/PropertyContext";



const ListProperties = () => {
  const { getProperties, properties, loading, setLoading } = React.useContext(PropertyContext)

  React.useEffect(() =>{
    setLoading(true)
    getProperties()
    
    //eslint-disable-next-line
  }, [])


  return (
    <div className="m-auto max-w-4xl min-h-screen">
      <div className="block mt-3">
        {
          loading ?
          <>
            <ListPulse />
            <ListPulse />
            <ListPulse />
            <ListPulse />
          </>
          :
          <>
          {
            properties?.length > 0 ? <>
              {
                properties.map(property =>{
                  return <Property property={property} key={property.id}/>
                })
              }
            </> 
            : 
            <div className="text-center font-semibold text-lg flex items-center h-screen justify-center">
              <span>You have no properties yet</span>
            </div>
          }
          </>
        }
      </div>
    </div>
  );
};

export default ListProperties;
