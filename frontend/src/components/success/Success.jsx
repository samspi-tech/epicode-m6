import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import OauthMessage from "../oauthMessage/OauthMessage.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GoogleAuthorContext } from "../../contexts/GoogleAuthorContext.jsx";

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { getAuthorByEmail, authorId } = useContext(GoogleAuthorContext);

    const token = searchParams.get('token');
    const googleUser = jwtDecode(token)._json;

    useEffect(() => {
        getAuthorByEmail(googleUser.email, token);

        if (token && authorId) {
            localStorage.setItem('token', JSON.stringify(token));
            sessionStorage.setItem('authorId', JSON.stringify(authorId));
        }

        const redirect = setTimeout(() => {
            navigate('/homepage', { replace: true });
        }, 2000);

        return () => clearTimeout(redirect);
    }, [token, authorId]);

    return (
        <OauthMessage
            text='Logging in...'
        />
    )
};

export default Success;