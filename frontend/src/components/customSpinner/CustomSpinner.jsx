import './customSpinner.css';
import { Spinner } from 'react-bootstrap';

const CustomSpinner = ({ text }) => {
    return (
        <div className="col-10 col-md-6 col-lg-5 col-xl-4 loading-spinner-container d-flex flex-column align-items-center gap-2">
            <Spinner className="loading-spinner one"></Spinner>
            <Spinner className="loading-spinner two"></Spinner>
            <span className="mt-5">{text}</span>
        </div>
    );
};

export default CustomSpinner;
