import './brandLogo.css';
import logo from '../../assets/images/epicodeLogo.jpeg';

const BrandLogo = () => {
    return (
        <div className="brand-logo d-flex align-items-center gap-1 mx-auto">
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Epiblog logo"
                    className="img-fluid nav-logo"
                />
            </div>
            <h2 className="mb-0">Epiblog</h2>
        </div>
    );
};

export default BrandLogo;
