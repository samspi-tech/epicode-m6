import './author.css';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import AuthorHeader from './partials/AuthorHeader.jsx';
import { AuthorsContext } from '../../contexts/AuthorsContext.jsx';

const Author = () => {
    const { id } = useParams();
    const { state, author, getSingleAuthor } = useContext(AuthorsContext);
    const { status } = state;
    
    useEffect(() => {
        getSingleAuthor(id);
    }, [id]);

    return (
        <Container>
            <Row>
                {status === 'ready' && <AuthorHeader author={author} />}
            </Row>
        </Container>
    );
};

export default Author;