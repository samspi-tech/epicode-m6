import { Button } from "react-bootstrap";

const OauthButton = ({ redirect, text, oauth }) => {
    return (
        <Button
            variant='danger'
            onClick={redirect}
            className='w-100 p-2 shadow'
        >
            {text} with{' '}
            <span className='fw-semibold'>
                {oauth}
            </span>
        </Button>
    );
};

export default OauthButton;