import React from "react"
import ListPulse from "../../components/loaders/ListPulse";
import Transfer from "../../components/transfers/Transfer";
import PropertyContext from "../../context/property/PropertyContext";



const ListTransfers = () => {
  const { getTransfers, transfers, loading } = React.useContext(PropertyContext)

  React.useEffect(() =>{
    getTransfers()
    //eslint-disable-next-line
  }, [])


  return (
    <div className="m-auto max-w-4xl min-h-screen">
      <div className="block mt-3">
        {
          !loading ? <>
          {
            transfers?.length > 0 ? <>
            <div className="w-full text-center my-4 text-xl">Transfers <i className="fa fa-exchange px-4"></i></div>
              {
                transfers.map(transfer =>{
                  return <Transfer transfer={transfer} key={transfer.id}/>
                })
              }
            </> 
            : 
            <div className="text-center flex justify-center">
              <span>You have no transfers yet</span>
            </div>
          }
          </>
          :
          <>
            <ListPulse />
            <ListPulse />
            <ListPulse />
            <ListPulse />
          </>
        }
      </div>
    </div>
  );
};

export default ListTransfers;
