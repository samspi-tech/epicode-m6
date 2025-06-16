import { jwtDecode } from "jwt-decode";
import { Outlet, Navigate } from 'react-router-dom';

export const isToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

const decodeToken = () => {
    const token = isToken();
    if (token) return jwtDecode(token).id;
}

const getAuthorIdFromSessionStorage = () => {
    return JSON.parse(sessionStorage.getItem('authorId'));
}

const saveAuthorIdToSessionStorage = () => {
    const authorId = decodeToken();
    const sessionId = getAuthorIdFromSessionStorage();

    if (!sessionId) sessionStorage.setItem('authorId', JSON.stringify(authorId));
};

export const isAuthorId = () => {
    const token = isToken();

    if (token) {
        saveAuthorIdToSessionStorage();
        return getAuthorIdFromSessionStorage();
    }
};

const ProtectedRoutes = () => {
    const isAuthorized = isToken();
    return isAuthorized ? <Outlet/> : <Navigate to={'/'} replace/>;
};

export default ProtectedRoutes;