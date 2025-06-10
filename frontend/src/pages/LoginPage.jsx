import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from "../components/welcome/Welcome.jsx";
import { isToken } from '../middleware/ProtectedRoutes.jsx';
import BrandLogo from '../components/brandLogo/BrandLogo.jsx';
import { Button, Col, Container, Row } from 'react-bootstrap';
import LoginForm from '../components/forms/loginForm/LoginForm.jsx';
import SignupForm from '../components/forms/signupForm/SignupForm.jsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    const handleSignup = () => {
        setIsSignup(prevState => !prevState);
    };

    const handleLoginPage = () => {
        setIsSignup(false);
        setIsLogin(prevState => !prevState);
    };

    useEffect(() => {
        const token = isToken();

        if (token) navigate('/homepage', { replace: true });
    }, [navigate]);

    const onRedirectGoogle = () => {
        window.location.href = 'http://localhost:9099/google'
    }

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center gap-4 position-relative">
            {isSignup && <Welcome handleSignup={handleSignup}/>}
            <Row>
                <Col className="d-flex justify-content-center">
                    <BrandLogo nav={'/'} fsLogo="display-2" w="65" h="65"/>
                </Col>
            </Row>
            {isLogin
                ? <LoginForm handleLoginPage={handleLoginPage}/>
                : <SignupForm handleLoginPage={handleLoginPage} handleSignup={handleSignup}/>}
            <Button
                variant='danger'
                onClick={onRedirectGoogle}
                className='align-self-center p-2 shadow'
            >
                Login with{' '}
                <span className='fw-semibold'>
                    Google
                </span>
            </Button>
        </Container>
    );
};

export default LoginPage;