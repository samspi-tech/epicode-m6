import { createContext, useState } from 'react';

export const SearchPostContext = createContext();

export const SearchPostProvider = ({ children }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    
    return (
        <SearchPostContext.Provider value={{ query, handleInputChange }}>
            {children}
        </SearchPostContext.Provider>
    );
};
