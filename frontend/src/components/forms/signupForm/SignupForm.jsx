import { Button, Col, Form, Row } from 'react-bootstrap';

const SignupForm = ({ handleLogin }) => {
    return (
        <Row className="justify-content-center">
            <Col xs={11} md={8} lg={6} xl={5}>
                <h5 className="text-center fw-bold">Welcome!</h5>
                <h5 className="text-center fw-bold mb-5">Create an account to share your story.</h5>
                <Form className="d-flex flex-column align-items-center gap-2">
                    <Form.Group className="w-100 d-flex flex-column flex-md-row gap-2">
                        <div className="w-100">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" />
                        </div>
                        <div className="w-100">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" />
                        </div>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control required type="date" />
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" />
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control required type="password" />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 py-2">Sign up</Button>
                </Form>
                <div className="mt-3 d-flex justify-content-center align-items-end gap-2">
                    <p className="mb-0">Already have an account?</p>
                    <Button
                        type="submit"
                        variant="link"
                        onClick={handleLogin}
                        className="p-0">Log in</Button>
                </div>
            </Col>
        </Row>
    );
};

export default SignupForm;