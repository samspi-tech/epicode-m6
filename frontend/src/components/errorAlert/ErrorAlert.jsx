import './errorAlert.css';
import { Alert } from 'react-bootstrap';
import { TriangleAlert } from 'lucide-react';

const ErrorAlert = ({ error, text }) => {
    return (
        <Alert className="error-alert">
            <div className="fs-5 px-5">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <TriangleAlert />
                    <span className="fw-bold">Error</span>
                </div>
                <p className="mb-0">
                    {error} {text}
                </p>
            </div>
        </Alert>
    );
};

export default ErrorAlert;
