import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const isToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

const saveAuthorIdToLocalStorage = () => {
    const token = isToken();
    const decodedToken = jwtDecode(token).id;

    localStorage.setItem('authorId', JSON.stringify(decodedToken));
};

export const isAuthorId = () => {
    const token = isToken();

    if (token) {
        saveAuthorIdToLocalStorage();

        return JSON.parse(localStorage.getItem('authorId'));
    }
};

const ProtectedRoutes = () => {
    const isAuthorized = isToken();

    return isAuthorized ? <Outlet/> : <Navigate to={'/'} replace/>;
};

export default ProtectedRoutes;