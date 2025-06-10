import { jwtDecode } from "jwt-decode";
import { Spinner } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorsContext } from "../../contexts/AuthorsContext.jsx";

const Success = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const { dispatch } = useContext(AuthorsContext);

    const token = searchParams.get('token');
    const decodedToken = jwtDecode(token);
    
    const user = decodedToken._json;
    const { name, picture } = user;


    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));

        dispatch({
            type: 'dataReceived',
            payload: {
                firstName: name,
                lastName: ' ',
                avatar: picture
            }
        })

        const redirectToHomepage = setTimeout(() => {
            navigate('/homepage', { replace: true })
        }, 1000);

        return () => clearTimeout(redirectToHomepage);
    }, []);

    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <p className='mb-0'>Login successful!</p>
            <p>Waiting to be redirected to homepage...</p>
            <Spinner/>
        </div>
    );
};

export default Success;