import './brandLogo.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/epicodeLogo.jpeg';

const BrandLogo = ({ w = 35, h = 35, fsLogo }) => {
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
                    width={w}
                    height={h}
                />
            </div>
            <h2 className={`mb-0 logo-name ${fsLogo}`}>Epiblog</h2>
        </Link>
    );
};

export default BrandLogo;
