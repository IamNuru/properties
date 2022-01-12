import { useReducer } from "react";
import { addDoc, collection, getDocs, doc, deleteDoc, getDoc, updateDoc, query, where } from "firebase/firestore";
import AuthReducer from "./PropertyReducer";
import PropertyContext from "./PropertyContext";
import { auth, db } from "../../config/Firebase";

//import variables from types
import {
  ERRORS,
  GET_PROPERTIES,
  GET_PROPERTY,
  SET_lOADING,
  SET_PROPERTY_TO_NULL,
  SET_TRANSFER_TO_NULL,
  GET_TRANSFER,
  GET_TRANSFERS,
  SUCCESS_MESSAGES,
} from "../../types";
import { useNavigate } from "react-router-dom";

const PropertyState = (props) => {
  const initialState = {
    property: null,
    errors: null,
    loading: false,
    properties: null,
    transfers: null,
    success: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate()
  const propertiesCollectionRef = collection(db, "properties");
  const transfersCollectionRef = collection(db, "transfers");

  const getProperty = async (pid) => {
    const docRef = doc(db, "properties", pid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch({
        type: GET_PROPERTY,
        payload: {...docSnap.data(), id: docSnap.id},
      })
    } else {
      console.log("No such document!");
    }
  };

  const getTransfer = async (tid) => {
    const docRef = doc(db, "transfers", tid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch({
        type: GET_TRANSFER,
        payload: {...docSnap.data(), id: docSnap.id},
      })
    } else {
      console.log("No such document!");
    }
  };

  const addProperty = async (data) => {
    await addDoc(propertiesCollectionRef, {
      ...data, uid: auth.currentUser.uid
    }).then(res =>{
      dispatch({
        type: SUCCESS_MESSAGES,
        payload: "Property was successfully added"
      })
    }).catch((err) =>{
      dispatch({
        type: ERRORS,
        payload: "Something went wrong, refresh page and try again"
      })
    });
  };


  const transferProperty = async (recId,recDName, pTitle, pId) => {
    
    const propertyDocRef = doc(db, "properties", pId);
    await addDoc(transfersCollectionRef, {
      from: auth.currentUser.uid,
      to: recId,
      displayName: recDName,
      propertyId: pId,
      pTitle: pTitle,
      date: +new Date(),
    });
    await updateDoc(propertyDocRef, {
      uid: recId,
  }).then(res =>{
    navigate("/my-properties")
  }).catch(err =>{
    dispatch({
      type: ERRORS,
      payload: "Something went wrong, refresh page and try again"
    })
  });;
  }
  
  const updateProperty = async (data, id) =>{
    const docRef = doc(db, "properties", id);

    await updateDoc(docRef, {
      ...data,
    }).then(res =>{
      navigate("/my-properties")
    }).catch(err =>{
      dispatch({
        type: ERRORS,
        payload: "Something went wrong, refresh page and try again"
      })
    });
  }

  const getProperties = async () => {
    const data = await getDocs(propertiesCollectionRef);
    const dt = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    
    dispatch({
      type: GET_PROPERTIES,
      payload: dt,
    });
  };
  const getTransfers = async () => {
    const data = await getDocs(transfersCollectionRef);
    const dt = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    dispatch({
      type: GET_TRANSFERS,
      payload: dt,
    });
  };



  const deleteProperty = async (pid) =>{
    const propDoc = doc(db, "properties", pid);
    let transfersDocRef = collection(db, "transfers");
    let q = query(transfersDocRef, where("propertyId", "==", pid));

    
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteDoc(propDoc).then(res =>{
        deleteDoc(q)
        navigate("/my-properties")
      }).catch(err =>{
        dispatch({
          type: ERRORS,
          payload: "Something went wrong, refresh page and try again"
        })
      });
    } else {
      
    }
    
  }

  const setPropertyToNull = () =>{
    dispatch({
      type: SET_PROPERTY_TO_NULL
    })
  }
  const setTransferToNull = () =>{
    dispatch({
      type: SET_TRANSFER_TO_NULL
    })
  }

  const setLoading = (loadingValue) =>{
    dispatch({
      type: SET_lOADING,
      payload: loadingValue
    })
  }

  const setError = err =>{
    dispatch({
      type: ERRORS,
      payload: err
    })
  }
  const setSuccessToNull = () =>{
    dispatch({
      type: SUCCESS_MESSAGES,
      payload: null,
    })
  }

  return (
    <PropertyContext.Provider
      value={{
        property: state.property,
        properties: state.properties,
        transfers: state.transfers,
        loading: state.loading,
        errors: state.errors,
        success: state.success,
        setLoading,
        addProperty,
        getProperties,
        getProperty,
        setPropertyToNull,
        transferProperty,
        getTransfers,
        getTransfer,
        setTransferToNull,
        deleteProperty,
        updateProperty,
        setError,
        setSuccessToNull,
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
};

export default PropertyState;
