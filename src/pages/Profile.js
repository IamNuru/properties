import React, { useState, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { Link } from "react-router-dom";
import PropertyContext from "../context/property/PropertyContext";
import manProfile from "../images/man-profile.jpg"
import womanProfile from "../images/woman-profile.jpg"
import LoadingGear from "../components/loaders/LoadingGear";

const Profile = () => {
  const { user, updateUserProfile, getUserProfile, profile, success, setSuccessToNull, loading, setLoading, errors, setError } =
    React.useContext(AuthContext);
  const { getProperties, properties, transfers, getTransfers } =
    React.useContext(PropertyContext);

  //state variables
  const [show, setShow] = useState(false)
  const [openbiography, setOpenbiography] = useState(false);
  const [data, setData] = useState({
    displayName: "",
    address: "",
    phoneNumber: "",
    biography: "",
    gender: "",
    ProfileURL:"",
  });
  const { displayName, address, phoneNumber, biography, gender, ProfileURL, setSuccessToNull } = data;

  useEffect(() => {
    if (user) {
      setLoading(true)
      getUserProfile(user.uid);
      getProperties(user.uid);
      getTransfers();
    }

    return () =>{
      setSuccessToNull()
    }

    //eslint-disable-next-line
  }, [user]);


  useEffect(() => {
    if (profile) {
      setData({
        displayName: profile?.displayName ? profile.displayName : "",
        address: profile?.address ? profile.address : "",
        phoneNumber: profile?.phoneNumber ? profile.phoneNumber : "",
        biography: profile?.biography ? profile.biography : "",
        gender: profile?.gender ? profile.gender : "",
        ProfileURL: profile?.ProfileURL ? profile.ProfileURL : "",
      });
    }
  }, [profile]);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setShow(true)
    setError(null)
    setSuccessToNull()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessToNull()
    setError(null)
    if (displayName === "") {
      return setError("Name field cannot be empty");
    }
    if (phoneNumber === "") {
      return setError("phone number field cannot be empty");
    }
    if (gender !== "m" && gender !== "f" && gender !== "") {
      return setError("Please choose a valid gender option");
    }

    try {
      setError(null);
      await updateUserProfile(data, profile.id);
    } catch (error) {
      setError(
        "Oppps!!.. Something went wrong. Failed to create an account!!!"
      );
    }
  };

  return (
    <div className="min-h-screen m-auto max-w-7xl mb-4">
      {loading ? (
        <LoadingGear />
      ) : (
        <>
          {profile ? (
            <div className="min-h-screen w-full max-w-4xl mx-auto">
              <div className="container mx-auto my-5 p-5">
                <div className="block md:flex md:no-wrap md:-mx-2 ">
                  <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-green-400">
                      <div className="image overflow-hidden max-w-sm bg-cover mx-auto border border-gray-300 h-48">
                        {user?.profileURL ? (
                          <img
                            className="h-full w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""
                          />
                        ) : (
                            profile?.gender ?
                            profile.gender === "f" ?
                              <img
                                className="h-full w-full mx-auto"
                                src={womanProfile}
                                alt=""
                              />
                              :
                              <img
                                className="h-full w-full mx-auto"
                                src={manProfile}
                                alt=""
                              />
                          :
                          <>
                            <img
                              className="h-full w-full mx-auto"
                              src={manProfile}
                              alt=""
                            />
                          </>
                        )}
                      </div>
                      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                        {profile?.displayName ? profile.displayName : "No name"}
                      </h1>
                      <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                        {profile?.biography ? (
                          profile.biography
                        ) : (
                          <span className="text-gray-400">
                            No biography
                          </span>
                        )}
                      </p>
                      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                          <span>Member since|</span>
                          <span className="ml-auto">
                            {new Date(
                              parseInt(user.metadata.createdAt)
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full md:w-9/12 mx-2">
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                      </div>
                      <div className="text-gray-700">
                        <form
                          onSubmit={handleSubmit}
                          autoComplete="new-password"
                        >
                          <div className="grid 2xl:grid-cols-2 text-sm">
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold">
                                Full Name
                              </div>
                              <div className="">
                                <input
                                  type="text"
                                  className="w-full border border-gray-150 py-1 focus:border
                        focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-500
                        disabled:bg-gray-50 "
                                  name="displayName"
                                  value={displayName}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold">
                                Gender
                              </div>
                              <div className="px-2 py-2">
                                <label className="px-2">
                                    <input type="radio" name="gender" value="m" onChange={onChange} checked={gender === "m"} />Male
                                </label>
                                <label className="px-2">
                                    <input type="radio" name="gender" value="f" onChange={onChange} checked={gender === "f"} />Female
                                </label>
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold">
                                Contact No.
                              </div>
                              <div className="">
                                <input
                                  type="text"
                                  autoComplete="new-password"
                                  className="w-full border border-gray-150 py-1 focus:border
                                  focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-500
                                  disabled:bg-gray-50 "
                                  name="phoneNumber"
                                  value={phoneNumber}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold"> Address</div>
                              <div className="">
                                <input
                                  type="text"
                                  autoComplete="new-password"
                                  className="w-full border border-gray-150 py-1 focus:border
                        focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-500
                        disabled:bg-gray-50 "
                                  name="address"
                                  value={address}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold">
                                Biography{" "}
                                <span
                                  onClick={() => setOpenbiography(!openbiography)}
                                  className="cursor-pointer px-2 text-indigo-500 font-light text-sm"
                                >
                                  Edit
                                </span>
                              </div>
                              <div className="">
                                <textarea
                                  type="text"
                                  autoComplete="new-password"
                                  className={`${
                                    openbiography
                                      ? "block h-48 p-2 rounded-md"
                                      : "hidden"
                                  } w-full border border-gray-150 py-1 focus:border
                        focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-500
                        disabled:bg-gray-50`}
                                  name="biography"
                                  value={biography}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold"> ProfileURL</div>
                              <div className="">
                                <input
                                  type="url"
                                  autoComplete="new-password"
                                  className="w-full border border-gray-150 py-1 focus:border
                                  focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-500
                                  disabled:bg-gray-50 "
                                  name="ProfileURL"
                                  value={ProfileURL}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2">
                              <div className="lg:px-4 py-2 font-semibold">
                                Email.
                              </div>
                              <div className="px-4 py-2">
                                <a
                                  className="text-blue-800"
                                  href={`mailto:${
                                    profile?.email ? profile?.email : "invalid"
                                  }`}
                                >
                                  {profile?.email ? (
                                    profile?.email
                                  ) : (
                                    <span className="text-gray-400">Null</span>
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                          {errors && errors !== "" && (
                            <p className="my-4 text-red-500 font-light text-center">
                              {errors}
                            </p>
                          )
                          }
                          {success && success !== "" && (
                            <p className="my-4 text-green-500 font-light text-center">
                              {success}
                            </p>
                          )
                          }
                          {
                          show && <button
                            type="submit"
                            className={`${loading ? 'cursor-not-allowed' : ''} block w-full text-blue-800 text-sm font-semibold rounded-lg 
                            hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 
                            hover:shadow-xs p-3 my-4`}
                           disabled={loading}>
                            Update
                          </button>
                          }
                          
                        </form>
                      </div>
                    </div>

                    <div className="my-4"></div>

                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <i
                              className="fa fa-building-o"
                              aria-hidden="true"
                            ></i>
                            <span className="tracking-wide">Properties</span>

                          </div>
                          {properties?.length > 0 ? (
                            <ul className="list-inside space-y-2">
                              {properties.slice(0,5).map((property) => { 
                                return (
                                  <li
                                    key={property.id}
                                    className="py-2 border-b border-gray-400"
                                  >
                                    <Link
                                      to={`/property/${property.id}`}
                                      className="text-teal-600"
                                    >
                                      {property.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="text-center mt-4">
                              You have no properties yet
                            </div>
                          )}
                          {
                            properties?.length > 5 && <Link to="/my-properties" className="my-4 font-semibold text-md text-blue-500">View all <i className="fa fa-long-arrow-right"></i></Link>
                          }
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span className="fa fa-exchange"></span>
                            <span className="tracking-wide">Transfers</span>
                          </div>
                          {transfers?.length > 0 ? (
                            <div className="py-1">
                              {transfers.slice(0,5).map((transfer) => {
                                return (
                                  <div key={transfer.id} className="block mb-8">
                                    <h3>{transfer.pTitle}</h3>
                                    <div className="flex flex-wrap my-2 justify-between">
                                      <div className="flex">
                                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 flex justify-center items-center rounded-full border border-gray-400">
                                          <i className="fa fa-user text-xl sm:text-2xl text-gray-400"></i>
                                        </div>
                                        <span className="text-gray-900 font-semibold px-1">me</span>
                                      </div>
                                      <span
                                        className={`fa ${
                                          transfer.from === profile.uid
                                            ? "fa-long-arrow-right text-red-600"
                                            : "fa-long-arrow-left text-green-600"
                                        } text-2xl font-semibold`}
                                      ></span>
                                      <div className="flex">
                                        <span className="text-gray-900 font-semibold px-1">
                                          {transfer?.displayName?.length > 10
                                            ? transfer.displayName.substring(
                                                0,
                                                10
                                              ) + "..."
                                            : transfer.displayName}
                                        </span>
                                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 flex justify-center items-center rounded-full border border-gray-400">
                                          <i className="fa fa-user text-xl sm:text-2xl text-gray-400"></i>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-gray-500 text-xs mt-2">
                                      {new Date(
                                        parseInt(transfer?.date)
                                      ).toLocaleDateString("en-Us", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                              {
                                transfers?.length > 5 && <Link to="/transfers" className="my-4 font-semibold text-md text-blue-500">View all <i className="fa fa-long-arrow-right"></i></Link>
                              }
                            </div>
                          ) : (
                            <div className="text-center mt-4">
                              You have no transfers yet
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center flex justify-center font-semibold text-lg">
              No Profile
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
