import { createContext, useReducer, useState } from 'react';
import { initialState, blogPostReducer } from '../reducers/blogPostsReducer.js';

export const BlogPostContext = createContext();

export const BlogPostProvider = ({ children }) => {
    // const [page, setPage] = useState(1);
    const [title, setTitle] = useState('');
    const [state, dispatch] = useReducer(blogPostReducer, initialState);
    const { page } = state;

    const getAllBlogPosts = async () => {
        try {
            const response = await fetch(
                `http://localhost:9099/blogPosts/title?q=${title}&pageSize=1&page=${page}`
            );
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

    const [payload, setPayload] = useState({
        cover: '',
        title: '',
        author: '',
        content: '',
        category: '',
        readTime: { value: 1 }
    });

    const handleBlogPostCreation = (e) => {
        const { name, value } = e.target;

        setPayload({
            ...payload,
            [name]: value
        });
    };

    const handleNestedObj = (e) => {
        setPayload({
            ...payload,
            readTime: { value: Number(e.target.value) }
        });
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
                dispatch,
                title,
                setTitle,
                getAllBlogPosts,
                page,
                payload,
                createBlogPost,
                handleNestedObj,
                handleBlogPostCreation
            }}
        >
            {children}
        </BlogPostContext.Provider>
    );
};
