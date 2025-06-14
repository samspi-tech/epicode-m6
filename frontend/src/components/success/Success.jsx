import { jwtDecode } from "jwt-decode";
import { Spinner } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorsContext } from "../../contexts/AuthorsContext.jsx";
import { GoogleAuthorContext } from "../../contexts/GoogleAuthorContext.jsx";

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { signup, } = useContext(AuthorsContext);
    const { getAuthorByEmail, authorId } = useContext(GoogleAuthorContext);

    const token = searchParams.get('token');
    const googleUser = jwtDecode(token)._json;
    const randomPassword = Math.random().toString(36).slice(-8);

    const payload = {
        firstName: googleUser.name,
        lastName: `${googleUser?.lastName}`,
        email: googleUser.email,
        password: randomPassword,
        passwordConfirm: randomPassword,
        dateOfBirth: '1990/01/01'
    }

    useEffect(() => {
        getAuthorByEmail(googleUser.email, token);

        if (token && authorId) {
            localStorage.setItem('token', JSON.stringify(token));
            sessionStorage.setItem('authorId', JSON.stringify(authorId));
        } else {
            signup(payload);
        }

        const redirect = setTimeout(() => {
            navigate('/homepage', { replace: true });
        }, 1500);

        return () => clearTimeout(redirect);
    }, [token, authorId]);

    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <p className='mb-0'>Login successful!</p>
            <p>Waiting to be redirected to homepage...</p>
            <Spinner/>
        </div>
    );
};

export default Success;