import { Col } from 'react-bootstrap';

const Post = ({ post }) => {
    const { author: email, title, category, content, cover, readTime } = post;
    const { value: time, unit } = readTime;
    const username = email.split('@')[0];

    return (
        <Col className="post-container d-flex flex-column flex-md-row mx-2 mx-md-0">
            <div className="post-img-container order-1 order-md-0">
                <img src={cover} alt="Post image" />
            </div>
            <div className="post-body d-flex flex-column justify-content-between p-3">
                <div>
                    <h3 className="fw-bold">{title}</h3>
                    <p className="ellipsis">{content}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <small>
                        In <span className="text-dark fw-bold">{category}</span>{' '}
                        by{' '}
                        <span className="text-capitalize text-dark fw-bold">
                            {username}
                        </span>
                    </small>
                    <small className="fst-italic">
                        {time} {unit} read
                    </small>
                </div>
            </div>
        </Col>
    );
};

export default Post;
