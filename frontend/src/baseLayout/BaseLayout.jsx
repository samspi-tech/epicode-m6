import Navigation from '../components/navigation/Navigation.jsx';

const BaseLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column vh-100">
            <Navigation />
            {children}
        </div>
    );
};

export default BaseLayout;
