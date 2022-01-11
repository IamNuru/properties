import { auth } from "../../config/Firebase";
import {
    SET_lOADING,
    GET_PROPERTY,
    SET_PROPERTY_TO_NULL,
    ERRORS,
    GET_PROPERTIES,
    GET_TRANSFERS,
    SUCCESS_MESSAGES,
} from "../../types";

const PropertyReducer = (state, action) => {
    switch (action.type) {
        

        case GET_PROPERTY:
            return {
                ...state,
                property: action.payload,
                loading: false,
            };
        case GET_PROPERTIES:
            return {
                ...state,
                properties: action.payload.filter(pro =>{
                    return pro.uid === auth.currentUser.uid
                }),
                loading: false,
            };
        case GET_TRANSFERS:
            return {
                ...state,
                transfers: action.payload.filter(transfer =>{
                    return transfer.from === auth.currentUser.uid || transfer.to === auth.currentUser.uid
                }),
                loading: false,
            };

        case SET_PROPERTY_TO_NULL:
            return{
                ...state,
                property: null,
                loading: false,
            }
        case SUCCESS_MESSAGES:
            return {
                ...state,
                errors: null,
                success: action.payload,
                loading: false,
            }

        case ERRORS:
            return {
                ...state,
                success: null,
                errors: action.payload,
                loading: false,
            };

        case SET_lOADING:
            return {
                ...state,
                loading: action.payload
            };



        default:
            return {
                ...state
            };
    }
};

export default PropertyReducer;
