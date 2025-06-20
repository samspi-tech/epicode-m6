import { Navigate } from "react-router-dom";
import { createContext, useState } from "react";

export const GoogleAuthorContext = createContext();

export const GoogleAuthorProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [authorId, setAuthorId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAuthorByEmail = async (authorEmail, token) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/authors/email/${authorEmail}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

            const author = await response.json();

            author
                ? setAuthorId(author.author._id)
                : <Navigate to={'/googleSignup'} replace/>

        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GoogleAuthorContext.Provider value={{
            error,
            isLoading,
            authorId,
            getAuthorByEmail
        }}>
            {children}
        </GoogleAuthorContext.Provider>
    );
};