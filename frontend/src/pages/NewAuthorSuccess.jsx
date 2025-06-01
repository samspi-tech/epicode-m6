import { Container, Row } from 'react-bootstrap';
import NewAuthor from '../components/newAuthor/NewAuthor.jsx';

const NewAuthorSuccess = () => {
    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row>
                <NewAuthor />
            </Row>
        </Container>
    );
};

export default NewAuthorSuccess;