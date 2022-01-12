import React, { useState } from "react"
import { useParams } from "react-router-dom"
import PropertyContext from "../../context/property/PropertyContext"
import {minDescriptionLength, maxTitleLength} from "../../types/GlobalVariables"


const EditProperty = () => {
    const { getProperty, updateProperty, property, setPropertyToNull, success } = React.useContext(PropertyContext)


    const { id } = useParams();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        title : '', description : '', image: '', photoURL:''
    })

    const { title, description, photoURL } = data

    React.useEffect(() =>{
        if(property !== null){
            setData({
                title: property?.title,
                description: property?.description,
                photoURL: property?.photoURL,
            })
        }

    }, [property])


    React.useEffect(() => {
          getProperty(id);
        return () => {
            setPropertyToNull()
        }
    //eslint-disable-next-line
    }, [id])

    


    const onChange = e =>{
        setData({ ...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        setLoading(true)
        setError(null)
        if(title === "" || description === ""){
            setLoading(false)
            return setError("Fields marked * cannot be empty")
        }
        if(title.length > maxTitleLength){
            setLoading(false)
            return setError(`Property Title/Name must not be more than ${maxTitleLength} characters`)
        }
        if(description.length < minDescriptionLength){
            setLoading(false)
            return setError(`Description must not be less than ${minDescriptionLength} characters`)
        }

        await updateProperty(data, id)
        setData("")

    }




    return (
        <div className="m-auto min-h-screen max-w-7xl">
            <div className="w-full max-w-4xl mx-auto">
                <div className="p-6 bg-white border-b border-gray-200">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                                name="title" value={title} onChange={onChange} required minLength={5} maxLength={75}/>
                        </div>

                        <div className="mb-4">
                            <label className="text-xl text-gray-600">Description<span className="text-red-500">*</span></label><br />
                            <textarea 
                                className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                                name="description" 
                                value={description} 
                                onChange={onChange}
                                minLength={15}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-xl text-gray-600">photoURL</label><br />
                            <input type="url" 
                                className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                                name="photoURL" 
                                value={photoURL} 
                                onChange={onChange} />
                        </div>
                        {
                            error && error !== "" &&
                            <p className="my-4 text-red-500 font-light text-center">{error}</p>
                        }
                        {
                            success && success !== "" &&
                            <p className="my-4 text-green-700 font-md text-center">{success}</p>
                        }
                        <div className="p-1">
                            <button 
                                type="submit" 
                                className={`${loading && 'cursor-not-allowed' } p-3 bg-blue-500 text-white hover:bg-blue-400 w-48`} 
                                disabled={loading}
                                >
                                    Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    )
}

export default EditProperty
