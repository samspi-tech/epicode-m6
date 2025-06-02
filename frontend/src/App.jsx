import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AuthorPage from './pages/AuthorPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import NewAuthorSuccess from './pages/NewAuthorSuccess.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route path="/newAuthorSuccess/:email" element={<NewAuthorSuccess />} />
                <Route path="/homepage/:id" element={<Homepage />} />
                <Route path="/author/:id" element={<AuthorPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
