import './errorAlert.css';
import { Alert } from 'react-bootstrap';
import { TriangleAlert } from 'lucide-react';

const ErrorAlert = ({ error, alert, text }) => {
    return (
        <Alert className="error-alert">
            <div className="fs-5 px-5">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <TriangleAlert />
                    <span className="fw-bold">{alert}</span>
                </div>
                <p className="mb-0 mt-2">
                    {error} {text}
                </p>
            </div>
        </Alert>
    );
};

export default ErrorAlert;
