import { Button, Col, Form, Row } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthorsContext } from '../../../contexts/AuthorsContext.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const { state, dispatch, data, loginPayload, authorPostRequest } = useContext(AuthorsContext);
    const { status } = state;

    const author = data?.authors.filter(author => {
        return author.email === loginPayload.email;
    });

    const isEmailRegistered = author?.length > 0;

    const handlePayload = e => {
        const { name, value } = e.target;

        const setPayload = {
            ...loginPayload,
            [name]: value
        };

        dispatch({
            type: 'setLoginPayload',
            payload: setPayload
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const isFormValid = form.checkValidity() === true;

        if (status === 'error') {
            return console.log('error');
        }

        if (isFormValid && isEmailRegistered) {
            authorPostRequest('login', loginPayload);
            status === 'logged' && navigate(`/homepage/${author[0]._id}`);
        }

        setValidated(true);
    };

    return (
        <Row className="justify-content-center">
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
                            value={loginPayload.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide correct email.
                        </Form.Control.Feedback>
                        {!isEmailRegistered &&
                            <Form.Control.Feedback className="text-danger">
                                This account is not registered!
                            </Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            onChange={handlePayload}
                            value={loginPayload.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide correct password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 py-2">Login</Button>
                </Form>
                <div className="mt-3 d-flex justify-content-center align-items-end gap-2">
                    <p className="mb-0">You don't have an account?</p>
                    <Button
                        variant="link"
                        onClick={handleLogin}
                        className="p-0">Sign up</Button>
                </div>
            </Col>
        </Row>
    );
};

export default LoginForm;