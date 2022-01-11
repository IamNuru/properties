import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext)
    let location = useLocation()



    if(!user && !loading){
        return <Navigate to="/login" state={ { from: location } } replace />
    }

    return children;
}

export default ProtectedRoute
