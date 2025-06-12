import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const isToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

export const decodedToken = () => {
    const token = isToken();
    return jwtDecode(token);
}

const ProtectedRoutes = () => {
    const isAuthorized = isToken();

    return isAuthorized ? <Outlet/> : <Navigate to={'/'} replace/>;
};

export default ProtectedRoutes;