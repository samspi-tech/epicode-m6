import { SquarePen } from 'lucide-react';
import BrandLogo from '../brandLogo/BrandLogo.jsx';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import CustomModal from '../customModal/CustomModal.jsx';
import BlogPostForm from '../blogPostForm/BlogPostForm.jsx';

const Navigation = () => {
    return (
        <Container fluid={true}>
            <Container className="py-3">
                <Row className="gy-4 align-items-center">
                    <Col sm={12} md={3} lg={4} className="d-flex">
                        <BrandLogo />
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <SearchBar />
                    </Col>
                    <Col sm={12} md={3} lg={4} className="d-flex">
                        <CustomModal
                            btnText={<SquarePen />}
                            text="Share with other users what's in your mind 😎"
                        >
                            <BlogPostForm />
                        </CustomModal>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Navigation;
