import { Col, Container, Row } from 'react-bootstrap';
import BrandLogo from '../components/brandLogo/BrandLogo.jsx';
import LoginForm from '../components/forms/loginForm/LoginForm.jsx';
import SignupForm from '../components/forms/signupForm/SignupForm.jsx';
import { useState } from 'react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        setIsLogin(prevState => !prevState);
    };

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center gap-4">
            <Row>
                <Col className="d-flex justify-content-center">
                    <BrandLogo nav={'/'} fsLogo="display-2" w="65" h="65"/>
                </Col>
            </Row>
            {isLogin
                ? <LoginForm handleLogin={handleLogin}/>
                : <SignupForm handleLogin={handleLogin}/>}
        </Container>
    );
};

export default LoginPage;