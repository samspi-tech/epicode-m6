import { createContext, useEffect, useReducer } from 'react';
import { authorsReducer, initialState } from '../reducers/authorsReducer.js';

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authorsReducer, initialState);
    const { data, token, author, signupPayload, loginPayload } = state;

    const getAllAuthors = async () => {
        try {
            const response = await fetch('http://localhost:9099/authors');
            const data = await response.json();

            dispatch({
                type: 'dataReceived',
                payload: data
            });
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                message: e.message
            });
        }
    };

    useEffect(() => {
        getAllAuthors();
    }, []);

    const getSingleAuthor = async (id) => {
        try {
            const response = await fetch(`http://localhost:9099/authors/${id}`);
            const data = await response.json();

            dispatch({
                type: 'singleAuthor',
                payload: data
            });
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                message: e.message
            });
        }
    };

    const authorPostRequest = async (req, payload) => {
        try {
            const response = await fetch(
                `http://localhost:9099/authors/${req}`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
            const data = await response.json();

            dispatch({
                type: 'tokenReceived',
                payload: data
            });
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                message: e.message
            });
        }
    };

    return (
        <AuthorsContext.Provider value={{
            data,
            token,
            author,
            state,
            dispatch,
            signupPayload,
            loginPayload,
            getAllAuthors,
            getSingleAuthor,
            authorPostRequest
        }}>
            {children}
        </AuthorsContext.Provider>
    );
};