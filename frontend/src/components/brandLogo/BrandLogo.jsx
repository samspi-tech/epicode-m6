import './brandLogo.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/epicodeLogo.jpeg';

const BrandLogo = () => {
    return (
        <Link
            to="/"
            className="brand-logo d-flex align-items-center gap-1 mx-auto mx-md-0"
        >
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Epiblog logo"
                    className="img-fluid nav-logo"
                />
            </div>
            <h2 className="mb-0">Epiblog</h2>
        </Link>
    );
};

export default BrandLogo;
