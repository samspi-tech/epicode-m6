import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { AuthorsProvider } from './contexts/AuthorsContext.jsx';
import { BlogPostProvider } from './contexts/BlogPostsContext.jsx';
import { SearchPostProvider } from './contexts/SearchPostContext.jsx';
import { GoogleAuthorProvider } from "./contexts/GoogleAuthorContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleAuthorProvider>
            <AuthorsProvider>
                <SearchPostProvider>
                    <BlogPostProvider>
                        <App/>
                    </BlogPostProvider>
                </SearchPostProvider>
            </AuthorsProvider>
        </GoogleAuthorProvider>
    </StrictMode>
);
