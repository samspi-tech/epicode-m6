import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AuthorsContext } from '../../../contexts/AuthorsContext.jsx';

const SignupForm = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const { dispatch, data, signupPayload, authorPostRequest } = useContext(AuthorsContext);

    const registeredAuthor = data?.authors?.filter(author => {
        return author.email === signupPayload.email;
    });

    const isEmailUnique = registeredAuthor?.length === 0 || registeredAuthor === undefined;
    const arePasswordsMatch = signupPayload.password === signupPayload.passwordConfirm;

    const handlePayload = e => {
        const { name, value } = e.target;

        const setPayload = {
            ...signupPayload,
            [name]: value
        };

        dispatch({
            type: 'setSignupPayload',
            payload: setPayload
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const isFormValid = form.checkValidity() === true;

        if (isFormValid && arePasswordsMatch && isEmailUnique) {
            authorPostRequest('create', signupPayload);
            navigate(`/newAuthorSuccess/${signupPayload.email}`);
        }

        setValidated(true);
    };

    return (
        <Row className="justify-content-center">
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
                                value={signupPayload.firstName}
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
                                value={signupPayload.lastName}
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
                            value={signupPayload.dateOfBirth}
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
                            value={signupPayload.email}
                            onChange={handlePayload}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required
                        </Form.Control.Feedback>
                        {!isEmailUnique &&
                            <Form.Control.Feedback className="text-danger">
                                Account already registered!
                            </Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="password"
                            value={signupPayload.password}
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
                            value={signupPayload.passwordConfirm}
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
                </Form>
                <div className="mt-3 d-flex justify-content-center align-items-end gap-2">
                    <p className="mb-0">Already have an account?</p>
                    <Button
                        variant="link"
                        onClick={handleLogin}
                        className="p-0">Log in</Button>
                </div>
            </Col>
        </Row>
    );
};

export default SignupForm;