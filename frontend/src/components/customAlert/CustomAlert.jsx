import './customAlert.css';
import { Alert } from 'react-bootstrap';
import { TriangleAlert } from 'lucide-react';

const CustomAlert = ({ error, alert, text }) => {
    return (
        <Alert className="col-10 col-md-8 col-lg-6 col-xl-4 error-alert">
            <div className="fs-5">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <TriangleAlert />
                    <span className="fw-bold">{alert}</span>
                </div>
                <p className="mb-0 mt-2 text-center">
                    {error} {text}
                </p>
            </div>
        </Alert>
    );
};

export default CustomAlert;
