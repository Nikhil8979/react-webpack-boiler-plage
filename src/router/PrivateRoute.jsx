import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import {useCurrentUser} from "../hooks/user";


const ProtectedRoutes = () => {
    const auth = useCurrentUser();
    return !!auth ? <Outlet/> : <Navigate to="/home"/>
}

export default ProtectedRoutes;
