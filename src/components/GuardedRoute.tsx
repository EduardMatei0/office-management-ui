import React from "react";
import { Navigate } from "react-router-dom";
import {getCurrentUser} from "../services/authService";

const AuthenticatedRoute = ( props: any) => {

    if (!getCurrentUser()) {
        return <Navigate to={`/login`} />;
    }

    return props.children;
}

export default AuthenticatedRoute;
