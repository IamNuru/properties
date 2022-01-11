import React from "react";
import PropertyContext from "../../context/property/PropertyContext";
import {minDescriptionLength, maxTitleLength} from "../../types/GlobalVariables"

const AddProperty = () => {
  const {
    setLoading,
    addProperty,
    success,
    setError,
    loading,
    errors,
    setSuccessToNull,
  } = React.useContext(PropertyContext);

  const [property, setProperty] = React.useState({
    title: "",
    description: "",
    photoURL: "",
  });
  const formRef = React.useRef();

  const { title, description, photoURL } = property;

  const onChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
    setSuccessToNull();
  };

  React.useEffect(() => {
    return () => {
      setSuccessToNull()
    }

    //eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (title === "" || description === "") {
      setLoading(false);
      return setError("Fields marked * cannot be empty");
    }
    if (title.length > maxTitleLength) {
      setLoading(false);
      return setError(
        `Property Title/Name must not be more than ${maxTitleLength} characters`
      );
    }
    if (description.length < minDescriptionLength) {
      setLoading(false);
      return setError(`Description must not be less than ${minDescriptionLength} characters`);
    }

    addProperty(property).then(() => {
      if (success) {
        formRef.current.input.value("");
      }
    });
  };

  return (
    <div className="m-auto mt-2 min-h-screen max-w-7xl">
      <div className="w-full max-w-4xl mx-auto">
        <div className="p-6 bg-white border-b border-gray-200">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="mb-4">
              <label className="text-xl text-gray-600">
                Title <span className="text-red-500">*</span>
              </label>
              <br />
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full"
                name="title"
                value={title}
                onChange={onChange}
                required
                maxLength={maxTitleLength}
              />
            </div>

            <div className="mb-4">
              <label className="text-xl text-gray-600">
                Description<span className="text-red-500">*</span>
              </label>
              <br />
              <textarea
                className="border-2 border-gray-500 w-full min-h-max"
                name="description"
                value={description}
                onChange={onChange}
                minLength={minDescriptionLength}
              />
            </div>

            <div className="mb-4">
              <label className="text-xl text-gray-600">photoURL</label>
              <br />
              <input
                type="url"
                className="border-2 border-gray-300 p-2 w-full"
                name="photoURL"
                value={photoURL}
                onChange={onChange}
              />
            </div>
            {errors && errors !== "" && (
              <p className="my-4 text-red-500 font-light text-center">
                {errors}
              </p>
            )}
            {success && success !== "" && (
              <p className="my-4 text-green-700 font-md text-center">
                {success}
              </p>
            )}
            <div className="p-1">
              <button type="submit" className={`${
                  (loading || success) && "cursor-not-allowed"
                } flex items-center p-3 bg-blue-500 text-white hover:bg-blue-400 w-48`} disabled={loading||success}>
                <div className=" w-full text-center font-semibold text-lg">Submit</div>
                {
                    loading &&
                    <svg className="animate-spin ml-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                    </svg>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
