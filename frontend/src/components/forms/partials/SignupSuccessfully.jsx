import { Col } from "react-bootstrap";

const SignupSuccessfully = () => {
    return (
        <Col xs={12} className='d-flex justify-content-center'>
            <div className='signup-successfully-container rounded-1 px-5 py-4 shadow mb-4'>
                <p className='mb-0 fw-semibold'>Signup successfully! 🎉</p>
            </div>
        </Col>
    );
};

export default SignupSuccessfully;