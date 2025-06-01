import './newAuthor.css';
import { Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewAuthor = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/homepage');
        }, 5000);

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
    }, []);

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