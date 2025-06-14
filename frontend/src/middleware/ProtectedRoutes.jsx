import { jwtDecode } from "jwt-decode";
import { Outlet, Navigate } from 'react-router-dom';

export const isToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

export const saveAuthorIdToSessionStorage = () => {
    const token = isToken();
    const decodedToken = jwtDecode(token).id;

    const sessionId = JSON.parse(sessionStorage.getItem('authorId'));

    if (!sessionId) sessionStorage.setItem('authorId', JSON.stringify(decodedToken));
};

export const isAuthorId = () => {
    const token = isToken();

    if (token) {
        saveAuthorIdToSessionStorage();

        return JSON.parse(sessionStorage.getItem('authorId'));
    }
};

const ProtectedRoutes = () => {
    const isAuthorized = isToken();

    return isAuthorized ? <Outlet/> : <Navigate to={'/'} replace/>;
};

export default ProtectedRoutes;