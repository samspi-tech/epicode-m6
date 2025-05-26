import { createContext, useState } from 'react';

export const BlogPostContext = createContext();

export const BlogPostProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const blogPosts = data && data.blogPosts ? data.blogPosts : data;

    const getAllBlogPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:9099/blogPosts/?pageSize=4&page=${page}`,
            );
            const data = await response.json();
            setData(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const [payload, setPayload] = useState({
        cover: '',
        title: '',
        author: '',
        content: '',
        category: '',
        readTime: { value: 1 },
    });

    const handleBlogPostCreation = (e) => {
        const { name, value } = e.target;

        setPayload({
            ...payload,
            [name]: value,
        });
    };

    const handleNestedObj = (e) => {
        setPayload({
            ...payload,
            readTime: { value: Number(e.target.value) },
        });
    };

    const createBlogPost = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                'http://localhost:9099/blogPosts/create',
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json',
                    },
                },
            );
            return await response.json();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
            getAllBlogPosts();
        }
    };

    return (
        <BlogPostContext.Provider
            value={{
                data,
                blogPosts,
                setData,
                error,
                isLoading,
                getAllBlogPosts,
                page,
                setPage,
                payload,
                createBlogPost,
                handleNestedObj,
                handleBlogPostCreation,
            }}
        >
            {children}
        </BlogPostContext.Provider>
    );
};
