import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/Firebase";
import { addDoc, collection, query, where, doc, updateDoc, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";

//import variables from types
import {SET_lOADING, GET_RECIPIENT, GET_USER, SET_RECEPIENT_TO_NULL, ERRORS, GET_USER_PROFILE, SUCCESS_MESSAGES } from "../../types";
import { Navigate } from "react-router-dom";

const AuthState = (props) => {
  const initialState = {
    user: null,
    profile: null,
    errors: null,
    success: null,
    loading: true,
    properties: null,
    recipient: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const Gprovider = new GoogleAuthProvider();
  const Fprovider = new FacebookAuthProvider();



  //set current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({
        type: GET_USER,
        payload: user,
      });
    });

    return unsubscribe;
  }, []);



  /** *** ACTIONS *** */
  //sign up with email and password
  const register = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password).then(
      () => {
        updateProfile(auth.currentUser, {
          displayName: data.fullName,
        }).then(() => {
          addDoc(usersCollectionRef, {
            phoneNumber: data.phoneNumber,
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
          });
        });
      }
    );
  };

  //signup with email
  const signUpWithEmail = () =>{
    
  signInWithPopup(auth, Gprovider).then((result) => {
      let data = result.user;   
      let docRef = collection(db, "users");
      let q = query(docRef, where("uid", "==", data.uid));
      getDocs(q).then((querySnapshot) =>{
      if (querySnapshot.docs.length > 1) {
        
      }else{
        addDoc(usersCollectionRef, {
          phoneNumber: data.phoneNumber,
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
        });
      }
    });
  }).catch((error) => {
    console.log(error)
  });
  }

  //signup with facebook
  const signUpWithFacebook = () =>{
    signInWithPopup(auth, Fprovider)
  .then((result) => {
    let data = result.user;
    updateProfile(data, {
      displayName: data.fullName,
    }).then(() => {
      let docRef = collection(db, "users");
      let q = query(docRef, where("uid", "==", data.uid));
      if(!q){
      addDoc(usersCollectionRef, {
        phoneNumber: data.phoneNumber,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
      });
      }
    });
  }).catch((error) => {
    console.log(error)

  });
  }

  const updateUserProfile = async (data, id) => {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      ...data,
    }).then(res =>{
      dispatch({
        type: SUCCESS_MESSAGES,
        payload: "User Profile Updated"
      })
      getUserProfile(auth.currentUser.uid)
    }).catch(err =>{
      alert('Something went wrong. Refresh and try again')
    });
  };

  const getUserProfile = async (uid) =>{
    let docRef = collection(db, "users");
    let q = query(docRef, where("uid", "==", uid));
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: {...doc.data(), id: doc.id}
      })
    })
  }

  //log user in
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  





  //log user out
  const logout = () => {
    signOut(auth)
      .then(() => {
        Navigate("/")
      })
      .catch((error) => {});
  };

  //check if email is in users tables
  const checkIfEmailExist = async (email) =>{
    const docRef = collection(db, "users");
    const q = query(docRef, where("email", "==", email));
    await getDocs(q).then((querySnapshot) =>{
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) =>{
          dispatch({
            type: GET_RECIPIENT,
            payload: {...doc.data(), id: doc.id }
          })
        })
      }else{
        
          dispatch({
            type: ERRORS,
            payload: "Email not found",
          })
          dispatch({
            type: SET_RECEPIENT_TO_NULL ,
          })
      }
    }).catch((err) =>{
      dispatch({
        type: ERRORS,
        payload: "Something went wrong",
      })
    })
  }

  //set recipient user to null
  const setRecipientToNull = () =>{
    dispatch({
      type: SET_RECEPIENT_TO_NULL
    })
  }


  const setError = (error) =>{
    dispatch({
      type: ERRORS,
      payload: error
    })
  }

  const setLoading = (loadingValue) =>{
    dispatch({
      type: SET_lOADING,
      payload: loadingValue
    })
  }
  const setSuccessToNull = () =>{
    dispatch({
      type: SUCCESS_MESSAGES,
      payload: null,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        profile: state.profile,
        errors: state.errors,
        success: state.success,
        loading: state.loading,
        recipient: state.recipient,
        login,
        register,
        signUpWithEmail,
        signUpWithFacebook,
        logout,
        updateUserProfile,
        getUserProfile,
        checkIfEmailExist,
        setRecipientToNull,
        setError,
        setLoading,
        setSuccessToNull,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
