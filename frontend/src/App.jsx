import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AuthorPage from './pages/AuthorPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Success from "./components/success/Success.jsx";
import ProtectedRoutes from "./middleware/ProtectedRoutes.jsx";
import GoogleSignup from "./components/googleSignup/GoogleSignup.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<LoginPage/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/homepage" element={<Homepage/>}/>
                    <Route path="/author" element={<AuthorPage/>}/>
                </Route>
                <Route path={"/googleSignup/user"} element={<GoogleSignup/>}/>
                <Route path={"/success/user"} element={<Success/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
