import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import NewAuthorSuccess from './pages/NewAuthorSuccess.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route path="/newAuthorSuccess" element={<NewAuthorSuccess />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
