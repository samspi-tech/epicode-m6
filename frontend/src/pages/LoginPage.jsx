import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { isToken } from '../middleware/ProtectedRoutes.jsx';
import BrandLogo from '../components/brandLogo/BrandLogo.jsx';
import LoginForm from '../components/forms/loginForm/LoginForm.jsx';
import SignupForm from '../components/forms/signupForm/SignupForm.jsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoginPage, setIsLoginPage] = useState(true);

    const handleLoginPage = () => {
        setIsLoginPage(prevState => !prevState);
    };

    useEffect(() => {
        const token = isToken();

        if (token) navigate(`/success/user?token=${token}`, { replace: true });
    }, [navigate]);

    const onRedirectGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/google`
    }

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center gap-4 position-relative">
            <Row>
                <Col className="d-flex justify-content-center">
                    <BrandLogo nav={'/'} fsLogo="display-2" w="65" h="65"/>
                </Col>
            </Row>
            {isLoginPage
                ? <LoginForm
                    redirect={onRedirectGoogle}
                    handleLoginPage={handleLoginPage}
                />
                : <SignupForm
                    redirect={onRedirectGoogle}
                    handleLoginPage={handleLoginPage}
                />}
        </Container>
    );
};

export default LoginPage;