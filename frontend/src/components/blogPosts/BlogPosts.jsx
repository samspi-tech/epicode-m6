import './blogPosts.css';
import Post from './partials/Post.jsx';
import { useContext, useEffect } from 'react';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';

const BlogPosts = () => {
    const { data, error, isLoading, getAllBlogPosts } =
        useContext(BlogPostContext);

    useEffect(() => {
        getAllBlogPosts();
    }, []);

    return (
        <div className="my-5 d-flex flex-column align-items-center gap-4">
            {isLoading && <p>Loading...</p>}
            {!isLoading && error && <p>Something went wrong...</p>}
            {!isLoading &&
                !error &&
                data &&
                data.blogPosts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
        </div>
    );
};

export default BlogPosts;
