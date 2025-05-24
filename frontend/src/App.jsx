import Homepage from './pages/Homepage.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<Homepage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
