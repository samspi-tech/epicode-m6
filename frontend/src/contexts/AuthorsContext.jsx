import { createContext, useReducer, useState } from 'react';
import { authorsReducer, initialState } from '../reducers/authorsReducer.js';

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authorsReducer, initialState);
    const { data, status, message } = state;

    const [isSignupSuccess, setIsSignupSuccess] = useState(false);

    const getMe = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/me`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            const data = await response.json()

            dispatch({
                type: 'dataReceived',
                payload: data.user
            })
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                message: e.message
            })
        }
    };

    const signup = async (payload) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/authors/create`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            const jsonResponse = await response.json()

            if (!response.ok) throw new Error(`${jsonResponse.message}`)

            return jsonResponse
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                message: e.message
            })
        } finally {
            setIsSignupSuccess(true);

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };

    return (
        <AuthorsContext.Provider value={{
            state,
            dispatch,
            data,
            status,
            message,
            getMe,
            signup,
            isSignupSuccess
        }}>
            {children}
        </AuthorsContext.Provider>
    );
};