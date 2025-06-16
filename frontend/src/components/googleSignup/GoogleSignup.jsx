import { jwtDecode } from "jwt-decode";
import OauthMessage from "../oauthMessage/OauthMessage.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthorsContext } from "../../contexts/AuthorsContext.jsx";

const GoogleSignup = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthorsContext);

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const googleUser = jwtDecode(token)._json;

    const randomPassword = Math.random().toString(36).slice(-8);

    const signupPayload = {
        firstName: googleUser.given_name,
        lastName: `${googleUser?.family_name}`,
        email: googleUser.email,
        dateOfBirth: '1990/01/01',
        password: randomPassword,
        passwordConfirm: randomPassword
    };

    useEffect(() => {
        signup(signupPayload);

        const redirect = setTimeout(() => {
            navigate(`/success/user?token=${token}`, { replace: true });
        }, 3000);

        return () => clearTimeout(redirect);
    }, [token]);

    return (
        <OauthMessage
            title='Signup successfull!'
            text='Wating to be redirected to login page...'
        />
    );
};

export default GoogleSignup;