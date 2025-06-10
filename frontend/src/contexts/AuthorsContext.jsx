import { createContext, useReducer } from 'react';
import { authorsReducer, initialState } from '../reducers/authorsReducer.js';

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authorsReducer, initialState);
    const { data, status, payload, message } = state;

    const getMe = async (token) => {
        try {
            const response = await fetch('http://localhost:9099/auth/me',
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

    const signup = async () => {
        try {
            const response = await fetch('http://localhost:9099/authors/create',
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
        }
    };

    return (
        <AuthorsContext.Provider value={{
            state,
            dispatch,
            data,
            status,
            payload,
            message,
            getMe,
            signup
        }}>
            {children}
        </AuthorsContext.Provider>
    );
};