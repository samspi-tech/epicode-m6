import { useContext, useState } from 'react';
import OauthButton from "../partials/OauthButton.jsx";
import { Button, Col, Form, Row } from 'react-bootstrap';
import CustomAlert from "../../customAlert/CustomAlert.jsx";
import { AuthorsContext } from '../../../contexts/AuthorsContext.jsx';

const SignupForm = ({ handleLoginPage, redirect }) => {
    const [validated, setValidated] = useState(false);
    const { state, status, dispatch, message, signup } = useContext(AuthorsContext);
    const { payload } = state;

    const arePasswordsMatch = payload.password === payload.passwordConfirm

    const handlePayload = e => {
        const { name, value } = e.target;

        const setPayload = {
            ...payload,
            [name]: value
        };

        dispatch({
            type: 'signup',
            payload: setPayload
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const isFormValid = form.checkValidity() === true;

        if (isFormValid && arePasswordsMatch) {
            signup(payload);
        }

        setValidated(true);
    };

    return (
        <Row className="justify-content-center">
            {status === 'error' && <CustomAlert alert='Error!' error={message}/>}
            <Col xs={11} md={8} lg={6} xl={5}>
                <h5 className="text-center fw-bold">Welcome!</h5>
                <h5 className="text-center fw-bold mb-5">
                    Create an account to share your story.
                </h5>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center gap-2"
                >
                    <div className="w-100 d-flex flex-column flex-md-row gap-2">
                        <Form.Group className="w-100">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="firstName"
                                onChange={handlePayload}
                                value={payload.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="w-100">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="lastName"
                                onChange={handlePayload}
                                value={payload.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <Form.Group className="w-100">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            name="dateOfBirth"
                            onChange={handlePayload}
                            value={payload.dateOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            name="email"
                            value={payload.email}
                            onChange={handlePayload}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="password"
                            value={payload.password}
                            onChange={handlePayload}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="passwordConfirm"
                            onChange={handlePayload}
                            value={payload.passwordConfirm}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required
                        </Form.Control.Feedback>
                        {!arePasswordsMatch &&
                            <Form.Control.Feedback className="text-danger">
                                Passwords are different.
                            </Form.Control.Feedback>}
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 py-2">Sign up</Button>
                    <OauthButton
                        text='Sign up'
                        oauth='Google'
                        redirect={redirect}
                    />
                </Form>
                <div className="mt-3 d-flex justify-content-center align-items-end gap-2">
                    <p className="mb-0">Already have an account?</p>
                    <Button
                        variant="link"
                        onClick={handleLoginPage}
                        className="p-0">Log in</Button>
                </div>
            </Col>
        </Row>
    );
};

export default SignupForm;