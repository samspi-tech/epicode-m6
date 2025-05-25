import './blogPosts.css';
import Post from './partials/Post.jsx';
import { useContext, useEffect } from 'react';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';
import ErrorAlert from '../errorAlert/ErrorAlert.jsx';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner.jsx';

const BlogPosts = () => {
    const { data, error, isLoading, getAllBlogPosts } =
        useContext(BlogPostContext);

    useEffect(() => {
        getAllBlogPosts();
    }, []);

    return (
        <div className="my-5 d-flex flex-column align-items-center gap-4">
            {isLoading && (
                <LoadingSpinner text="Getting every post for you... Just hang on!" />
            )}
            {!isLoading && error && <ErrorAlert error={error} text="posts." />}
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
