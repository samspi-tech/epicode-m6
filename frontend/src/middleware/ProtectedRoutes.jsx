import { Outlet, Navigate } from 'react-router-dom';


export const isToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

const ProtectedRoutes = () => {
    const isAuthorized = isToken();

    return isAuthorized ? <Outlet/> : <Navigate to={'/'} replace/>;
};

export default ProtectedRoutes;