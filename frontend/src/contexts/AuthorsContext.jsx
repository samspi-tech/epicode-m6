import { createContext, useEffect, useReducer } from 'react';
import { authorsReducer, initialState } from '../reducers/authorsReducer.js';

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authorsReducer, initialState);
    const { data, payload } = state;

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

    const createNewAuthor = async () => {
        try {
            const response = await fetch(
                'http://localhost:9099/authors/create',
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

            return await response.json();
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                message: e.message
            });
        }
    };

    return (
        <AuthorsContext.Provider value={{
            state,
            data,
            payload,
            dispatch,
            getAllAuthors,
            createNewAuthor
        }}>
            {children}
        </AuthorsContext.Provider>
    );
};