import { createContext, useReducer } from 'react';
import { isToken } from "../middleware/ProtectedRoutes.jsx";
import { blogPostReducer, initialState } from '../reducers/blogPostsReducer.js';

export const BlogPostContext = createContext();

export const BlogPostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogPostReducer, initialState);
    const { page, title, payload, data } = state;
    
    const token = isToken()

    const getAllBlogPosts = async () => {
        try {
            const response = await fetch(
                `http://localhost:9099/blogPosts?title=${title}&pageSize=3&page=${page}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

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

    const createBlogPost = async () => {
        try {
            const response = await fetch(
                'http://localhost:9099/blogPosts/create',
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );

            return await response.json();
        } catch (e) {
            dispatch({
                type: 'dataFailed',
                payload: e.message
            });
        } finally {
            getAllBlogPosts();
        }
    };

    return (
        <BlogPostContext.Provider
            value={{
                state,
                data,
                page,
                title,
                payload,
                dispatch,
                getAllBlogPosts,
                createBlogPost
            }}
        >
            {children}
        </BlogPostContext.Provider>
    );
};
