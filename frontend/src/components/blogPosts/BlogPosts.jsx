import './blogPosts.css';
import { useContext } from 'react';
import Post from './partials/Post.jsx';
import { Container, Row } from 'react-bootstrap';
import CustomAlert from '../customAlert/CustomAlert.jsx';
import CustomSpinner from '../customSpinner/CustomSpinner.jsx';
import { BlogPostContext } from '../../contexts/BlogPostsContext.jsx';

const BlogPosts = () => {
    const { state } = useContext(BlogPostContext);
    const { data, status, message } = state;

    return (
        <Container>
            <Row className="mt-5 gy-4 gx-0 flex-column align-items-center">
                {status === 'loading' && <CustomSpinner text="Getting every post for you... Just hang on!"/>}
                {status === 'error' && <CustomAlert alert="Posts Error" error={message}/>}
                {status === 'ready' && data.blogPosts && data.blogPosts.map((post) => {
                    return <Post key={post._id} post={post}/>;
                })}
            </Row>
        </Container>
    );
};

export default BlogPosts;