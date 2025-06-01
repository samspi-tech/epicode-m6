import { Button, Col, Form, Row } from 'react-bootstrap';

const LoginForm = ({ handleLogin }) => {
    return (
        <Row className="justify-content-center">
            <Col xs={11} md={8} lg={6} xl={5}>
                <Form className="d-flex flex-column align-items-center gap-2">
                    <Form.Group className="w-100">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 py-2">Login</Button>
                </Form>
                <div className="mt-3 d-flex justify-content-center align-items-end gap-2">
                    <p className="mb-0">You don't have an account?</p>
                    <Button
                        type="submit"
                        variant="link"
                        onClick={handleLogin}
                        className="p-0">Sign up</Button>
                </div>
            </Col>
        </Row>
    );
};

export default LoginForm;