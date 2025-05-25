import './blogPosts.css';
import { useContext } from 'react';
import Post from './partials/Post.jsx';
import ErrorAlert from '../errorAlert/ErrorAlert.jsx';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner.jsx';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';
import { SearchPostContext } from '../../contexts/SearchPostContext.jsx';

const BlogPosts = () => {
    const { query } = useContext(SearchPostContext);
    const { blogPosts, error, isLoading } = useContext(BlogPostContext);

    return (
        <div className="my-5 d-flex flex-column align-items-center gap-4">
            {isLoading && (
                <LoadingSpinner text="Getting every post for you... Just hang on!" />
            )}
            {!isLoading && error && (
                <ErrorAlert alert="Error" error={error} text="posts." />
            )}
            {!isLoading && !error && blogPosts && blogPosts.length === 0 && (
                <ErrorAlert
                    alert="Attention"
                    text={`Can't find post by "${query}"`}
                />
            )}
            {!isLoading &&
                !error &&
                blogPosts &&
                blogPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
    );
};

export default BlogPosts;
