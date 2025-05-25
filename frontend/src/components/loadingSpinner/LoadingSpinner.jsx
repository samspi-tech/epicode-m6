import './loadingSpinner.css';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ text }) => {
    return (
        <div className="loading-spinner-container d-flex flex-column gap-2">
            <Spinner className="loading-spinner one"></Spinner>
            <Spinner className="loading-spinner two"></Spinner>
            <span className="mt-5">{text}</span>
        </div>
    );
};

export default LoadingSpinner;
