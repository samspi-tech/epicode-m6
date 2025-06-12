import { Col } from 'react-bootstrap';

const Post = ({ post }) => {
    const { author, title, category, content, cover, readTime } = post;
    const { value: time, unit } = readTime;

    const username = `${author.firstName} ${author.lastName.slice(0, 1)}.`

    return (
        <Col
            sm={8}
            lg={9}
            xl={8}
            className="post-container d-flex flex-column flex-lg-row mx-2 mx-md-0 px-0"
        >
            <div className="post-img-container order-1 order-lg-0">
                <img
                    src={cover}
                    alt="Post image"
                />
            </div>
            <div className="post-body d-flex flex-column justify-content-between p-3 w-100">
                <div>
                    <h3 className="fw-bold">{title}</h3>
                    <p className="ellipsis">{content}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <small>
                        In{' '}
                        <span className="text-capitalize text-dark fw-bold">
                            {category}
                        </span>{' '}
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
