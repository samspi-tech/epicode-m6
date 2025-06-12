import { createContext, useReducer, } from 'react';
import { decodedToken, isToken } from "../middleware/ProtectedRoutes.jsx";
import { blogPostReducer, initialState } from '../reducers/blogPostsReducer.js';

export const BlogPostContext = createContext();

export const BlogPostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogPostReducer, initialState);
    const { status, page, title, payload, data, authorPosts } = state;

    const token = isToken();
    const authorId = decodedToken().id;

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

    const getAuthorBlogPosts = async () => {
        try {
            const response = await fetch(
                `http://localhost:9099/blogPosts/author/${authorId}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
            const posts = await response.json();

            dispatch({
                type: 'authorPostsReceived',
                payload: posts.authorBlogPosts
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
                `http://localhost:9099/blogPosts/create/${authorId}`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
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
            getAuthorBlogPosts();

            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    return (
        <BlogPostContext.Provider
            value={{
                state,
                data,
                authorPosts,
                page,
                status,
                title,
                payload,
                dispatch,
                getAllBlogPosts,
                getAuthorBlogPosts,
                createBlogPost
            }}
        >
            {children}
        </BlogPostContext.Provider>
    );
};
