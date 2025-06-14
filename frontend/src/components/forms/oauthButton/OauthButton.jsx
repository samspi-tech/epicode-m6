import { Button } from "react-bootstrap";

const OauthButton = ({ redirect, text }) => {
    return (
        <Button
            variant='danger'
            onClick={redirect}
            className='w-100 p-2 shadow'
        >
            Sign in with{' '}
            <span className='fw-semibold'>
                {text}
            </span>
        </Button>
    );
};

export default OauthButton;