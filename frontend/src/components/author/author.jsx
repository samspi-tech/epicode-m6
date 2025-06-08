import './author.css';
import { useContext } from "react";
import { Container, Row } from 'react-bootstrap';
import AuthorHeader from './partials/AuthorHeader.jsx';
import { AuthorsContext } from "../../contexts/AuthorsContext.jsx";

const Author = () => {
    const { data, status } = useContext(AuthorsContext)

    return (
        <Container>
            <Row>
                {status === 'ready' && <AuthorHeader author={data}/>}
            </Row>
        </Container>
    );
};

export default Author;