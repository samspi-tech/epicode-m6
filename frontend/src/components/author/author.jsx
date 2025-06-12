import './author.css';
import { useContext, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import Post from "../blogPosts/partials/Post.jsx";
import AuthorHeader from './partials/AuthorHeader.jsx';
import { AuthorsContext } from "../../contexts/AuthorsContext.jsx";
import { BlogPostContext } from "../../contexts/BlogPostsContext.jsx";

const Author = () => {
    const { data, status } = useContext(AuthorsContext);
    const { getAuthorBlogPosts, state } = useContext(BlogPostContext);
    const { authorPosts, status: postsStatus } = state;

    useEffect(() => {
        getAuthorBlogPosts();
    }, []);

    return (
        <Container>
            <Row>
                {status === 'ready' && <AuthorHeader author={data}/>}
            </Row>
            <Row className='justify-content-center my-5 gy-3'>
                {postsStatus === 'loading' && <h1>loading...</h1>}
                {postsStatus === 'error' && <h1>error...</h1>}
                {postsStatus === 'ready' && authorPosts.map(post => {
                    return <Post key={post._id} post={post}/>
                })}
            </Row>
        </Container>
    );
};

export default Author;