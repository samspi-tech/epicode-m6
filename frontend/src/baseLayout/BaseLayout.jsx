import { useContext, useEffect } from "react";
import { isToken } from "../middleware/ProtectedRoutes.jsx";
import { AuthorsContext } from "../contexts/AuthorsContext.jsx";
import Navigation from '../components/navigation/Navigation.jsx';

const BaseLayout = ({ children }) => {
    const token = isToken();
    const { getMe } = useContext(AuthorsContext);

    useEffect(() => {
        getMe(token);
    }, [token]);

    return (
        <div className="d-flex flex-column vh-100">
            <Navigation/>
            {children}
        </div>
    );
};

export default BaseLayout;
