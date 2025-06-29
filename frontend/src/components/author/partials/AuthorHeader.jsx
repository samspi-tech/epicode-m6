import { Col } from 'react-bootstrap';
import CustomModal from '../../customModal/CustomModal.jsx';
import UpdateAuthorDetails from '../../forms/updateAuthorDetails/UpdateAuthorDetails.jsx';

const AuthorHeader = ({ author }) => {
    const { firstName, lastName, avatar } = author;

    return (
        <Col className='mb-5'>
            <header className="profile-header position-relative">
                <div className="author-page-picture">
                    <img
                        src={avatar}
                        alt="Profile picture"
                    />
                </div>
                <h1 className="author-page-name mb-0">
                    {firstName}{' '}{lastName}
                </h1>
            </header>
            <div className="profile-page-actions">
                <CustomModal
                    fullscreen={false}
                    btnText="Settings"
                    btnVariant='outline-light'
                    text="Update your profile"
                >
                    <UpdateAuthorDetails/>
                </CustomModal>
            </div>
        </Col>
    );
};

export default AuthorHeader;