import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin.js";
import { Button, Col, Form, Row } from 'react-bootstrap';
import CustomAlert from "../../customAlert/CustomAlert.jsx";
import OauthButton from "../partials/OauthButton.jsx";

const LoginForm = ({ handleLoginPage, redirect }) => {
    const { payload, error, handlePayload, login } = useLogin();
    const [validated, setValidated] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const isFormValid = form.checkValidity() === true;

        if (isFormValid) login();

        setValidated(true)
    };

    return (
        <Row className="flex-column justify-content-center align-items-center">
            {error && <CustomAlert alert='Error!' error={error}/>}
            <Col xs={11} md={7} lg={5} xl={4}>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center gap-2"
                >
                    <Form.Group className="w-100">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            name="email"
                            type="email"
                            onChange={handlePayload}
                            value={payload.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide correct email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            onChange={handlePayload}
                            value={payload.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide correct password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 py-2">Login</Button>
                    <OauthButton
                        text='Sign in'
                        oauth='Google'
                        redirect={redirect}
                    />
                </Form>
                <div className="mt-3 d-flex justify-content-center align-items-end gap-2">
                    <p className="mb-0">You don't have an account?</p>
                    <Button
                        variant="link"
                        onClick={handleLoginPage}
                        className="p-0">Sign up</Button>
                </div>
            </Col>
        </Row>
    );
};

export default LoginForm;