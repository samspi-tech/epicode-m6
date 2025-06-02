import './customModal.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = ({ text, btnText, fullscreen, children }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow((prevState) => !prevState);
    };

    return (
        <div>
            <Button
                onClick={handleShow}
                className="border-0"
                variant="outline-light"
                data-testid="showModalButton"
            >
                <span>{btnText}</span>
            </Button>
            <Modal
                show={show}
                data-testid="modal"
                onHide={handleShow}
                fullscreen={fullscreen}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="mb-0">{text}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </div>
    );
};

export default CustomModal;
