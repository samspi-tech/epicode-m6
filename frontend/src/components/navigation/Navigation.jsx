import './navigation.css';
import { SquarePen } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BrandLogo from '../brandLogo/BrandLogo.jsx';
import SearchBar from '../searchBar/SearchBar.jsx';
import ProfileIcon from './partials/ProfileIcon.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import CustomModal from '../customModal/CustomModal.jsx';
import BlogPostForm from '../forms/blogPostForm/BlogPostForm.jsx';
import { AuthorsContext } from '../../contexts/AuthorsContext.jsx';

const Navigation = () => {
    const { id } = useParams();
    const { author, getSingleAuthor } = useContext(AuthorsContext);

    useEffect(() => {
        getSingleAuthor(id);
    }, [id]);

    return (
        <Container fluid={true}>
            <Container className="py-3">
                <Row className="gy-4 align-items-center">
                    <Col
                        sm={12}
                        lg={4}
                        className="d-flex justify-content-center justify-content-lg-start"
                    >
                        <BrandLogo nav={'/homepage'} />
                    </Col>
                    <Col sm={12} lg={4}>
                        <SearchBar />
                    </Col>
                    <Col
                        sm={12}
                        lg={4}
                        className="d-flex justify-content-center justify-content-lg-end align-items-center gap-3"
                    >
                        <Link
                            to={`/homepage/${id}`}
                            className="nav-links logout"
                        >
                            Home
                        </Link>
                        <Link
                            to={`/author/${id}`}
                            className="nav-links profile"
                        >
                            <ProfileIcon author={author} />
                        </Link>
                        <CustomModal
                            btnText={<SquarePen />}
                            text="Share with other users what's in your mind 😎"
                        >
                            <BlogPostForm />
                        </CustomModal>
                        <Link
                            to="/"
                            className="nav-links logout"
                        >
                            Logout
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Navigation;
