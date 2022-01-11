import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";


const Transfer = ({ transfer }) => {

  const {user} = React.useContext(AuthContext)


  return (
    <>
      {transfer && (
        <div
          className="ml-1 mb-2 md:mb-4 bg-gray-50 shadow-md border border-gray-300 rounded-md transition ease-in-out delay-150
           p-4 grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6
            gap-1 hover:bg-gray-200"
        >
          <div className="col-span-2 sm:col-span-6 xl:col-span-6">
            <h3 className="font-semibold">{transfer.pTitle}</h3>
            <div className="block mb-4">
              <div className="flex flex-wrap my-2 justify-between">
                <div className="flex">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 flex justify-center items-center rounded-full border border-gray-400">
                    <i className="fa fa-user text-xl sm:text-2xl text-gray-400"></i>
                  </div>
                  <span className="text-gray-600 font-semibold px-1">me</span>
                </div>
                <span
                  className={`fa ${
                    transfer.from === user.uid
                      ? "fa-long-arrow-right text-red-600"
                      : "fa-long-arrow-left text-green-600"
                  } text-2xl font-semibold`}
                ></span>
                <div className="flex">
                  <span className="text-gray-600 font-semibold px-1">
                    {transfer?.displayName?.length > 20
                      ? transfer.displayName.substring(0, 20) + "..."
                      : transfer.displayName}
                  </span>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 flex justify-center items-center rounded-full border border-gray-400">
                    <i className="fa fa-user text-xl sm:text-2xl text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-2 text-center">
                {new Date(parseInt(transfer?.date)).toLocaleDateString(
                  "en-Us",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </div>
            <div className="w-full flex justify-between">
                <Link to={`/property/${transfer.propertyId}`} className="text-center bg-green-500 hover:bg-green-700 text-white font-medium px-4 py-1 rounded-xs text-md">Property Details</Link>
                <Link to={`/transfer/${transfer.propertyId}`} className="text-center md:ml-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded-xs text-md">Transfer</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transfer;
