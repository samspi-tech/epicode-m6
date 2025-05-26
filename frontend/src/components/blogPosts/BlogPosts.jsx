import './blogPosts.css';
import { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import Post from './partials/Post.jsx';
import CustomAlert from '../customAlert/CustomAlert.jsx';
import CustomSpinner from '../customSpinner/CustomSpinner.jsx';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';
import { SearchPostContext } from '../../contexts/SearchPostContext.jsx';

const BlogPosts = () => {
    const { query } = useContext(SearchPostContext);
    const { blogPosts, error, isLoading } = useContext(BlogPostContext);

    return (
        <Container>
            <Row className="my-5 gy-4 gx-0 flex-column align-items-center">
                {isLoading && (
                    <CustomSpinner text="Getting every post for you... Just hang on!" />
                )}
                {!isLoading && error && (
                    <CustomAlert alert="Error" error={error} text="posts." />
                )}
                {!isLoading &&
                    !error &&
                    blogPosts &&
                    blogPosts.length === 0 && (
                        <CustomAlert
                            alert="Oops!"
                            text={`Can't find post by "${query}"`}
                        />
                    )}
                {!isLoading &&
                    !error &&
                    blogPosts &&
                    blogPosts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
            </Row>
        </Container>
    );
};

export default BlogPosts;
