import { Col } from 'react-bootstrap';

const AuthorHeader = ({ author }) => {
    const { firstName, lastName, avatar } = author.author;

    return (
        <Col>
            <header className="profile-header position-relative">
                <div className="author-page-picture">
                    <img
                        src={avatar}
                        alt="Profile picture"
                        className="img-fluid"
                    />
                </div>
                <h1 className="author-page-name mb-0">
                    {firstName}{' '}{lastName}
                </h1>
            </header>
        </Col>
    );
};

export default AuthorHeader;