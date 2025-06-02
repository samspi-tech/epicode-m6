import './newAuthor.css';
import { Col } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthorsContext } from '../../contexts/AuthorsContext.jsx';

const NewAuthor = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [timer, setTimer] = useState(3);
    const { data, getAllAuthors } = useContext(AuthorsContext);

    useEffect(() => {
        getAllAuthors();
    }, []);

    const newAuthor = data?.authors?.filter(author => {
        return author.email === email;
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            data && navigate(`/homepage/${newAuthor[0]._id}`);
        }, 3000);

        const countdown = setInterval(() => {
            setTimer(prevState => {
                return prevState > 0
                    ? prevState - 1
                    : 0;
            });
        }, 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(countdown);
        };
    }, [timer]);

    return (
        <Col>
            <div className="new-author-message p-4 rounded shadow">
                <p className="mb-0 fw-bold">New account created successfully!</p>
                <small>Redirecting you to homepage in {timer}...</small>
            </div>
        </Col>
    );
};

export default NewAuthor;