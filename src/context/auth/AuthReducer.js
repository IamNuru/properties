import { SET_lOADING, ERRORS,SUCCESS_MESSAGES, GET_RECIPIENT, GET_USER, GET_USER_PROFILE, SET_RECEPIENT_TO_NULL } from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
        errors : null,
        loading: false,
      };
    case GET_RECIPIENT:
      return {
        ...state,
        recipient: action.payload,
        errors: null,
        loading: false,
      };

    case SET_RECEPIENT_TO_NULL:
      return {
        ...state,
        recipient: null,
      };

    case SET_lOADING:
      return {
        ...state,
        loading: action.payload
      }

    case SUCCESS_MESSAGES:
      return{
        ...state,
        success: action.payload,
        loading: false,
      }

    case ERRORS:
      return{
        ...state,
        errors: action.payload,
        loading: false,
      }


    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
