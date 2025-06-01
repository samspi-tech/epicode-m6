import { createContext, useReducer } from 'react';
import { authorsReducer, initialState } from '../reducers/authorsReducer.js';

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authorsReducer, initialState);
    const { payload } = state;

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
            payload,
            dispatch,
            createNewAuthor
        }}>
            {children}
        </AuthorsContext.Provider>
    );
};