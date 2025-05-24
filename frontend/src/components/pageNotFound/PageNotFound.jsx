import { Col, Container, Row } from 'react-bootstrap';

const PageNotFound = () => {
    return (
        <Container>
            <Row>
                <Col className="vh-100 d-flex align-items-center justify-content-center">
                    <h1 className="mb-0 display-1 w-25 font-monospace fw-bold">
                        404 / Page Not Found
                    </h1>
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;
