import React from 'react'
import { Link } from "react-router-dom"

import noPropertyImage from "../../images/no-property-image.png"

const Property = ({property}) => {
    return (
     
     <>
      {
        property && 
        <div
          className="mb-2 md:mb-4 bg-gray-50 shadow-md border border-gray-300 rounded-md transition ease-in-out delay-150
           px-2 py-2 md:py-4 grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6
            gap-1 hover:bg-gray-800 hover:opcaity-80 hover:text-white"
        >
          <div className="col-span-2 sm:col-span-1 xl:col-span-1">
            {
              property.photoURL ?
              <img
                alt="..."
                src={`${property.photoURL}`}
                className="h-24 w-24 rounded border border-gray-300 bg-cover mx-auto"
              />
              :
              <img
                alt="..."
                src={noPropertyImage}
                className="h-24 w-24 rounded border border-gray-300 bg-cover mx-auto"
              />
            }
          </div>
          <div className="col-span-2 sm:col-span-5 xl:col-span-5">
            <h3 className="font-semibold">{property.title}</h3>
            <p>
              {
                property.description.length > 100 ? property.description.substring(0,100)+' ...' : property.description
              }
            </p>
            <div className="w-full flex justify-between">
                <Link to={`/property/${property.id}`} className="text-center bg-green-500 hover:bg-green-700 text-white font-medium px-4 py-1 rounded-xs text-md">View More</Link>
                <Link to={`/transfer/${property.id}`} className="text-center md:ml-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded-xs text-md">Transfer</Link>
            </div>
          </div>
        </div>
      }
      </>
    )
}

export default Property
