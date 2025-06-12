import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useUpdateProfileDetails } from '../../../hooks/useUpdateProfileDetails.js';
import { AuthorsContext } from "../../../contexts/AuthorsContext.jsx";

const AddImageForm = () => {
    const { data } = useContext(AuthorsContext);
    const [file, setFile] = useState(null);

    const [fields, setFields] = useState({
        firstName: `${data.firstName}`,
        lastName: `${data.lastName}`
    });

    const { handleSubmit } = useUpdateProfileDetails(file, fields);

    const handleFileValue = e => {
        setFile(e.target.files[0]);
    };

    const handleFields = e => {
        const { name, value } = e.target;

        setFields({
            ...fields,
            [name]: value
        });
    };

    return (
        <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="my-2 d-flex flex-column"
        >
            <Form.Group className='mb-3'>
                <Form.Label>Profile picture</Form.Label>
                <Form.Control
                    type="file"
                    name="avatar"
                    onChange={handleFileValue}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>First name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    onChange={handleFields}
                    value={fields.firstName}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    onChange={handleFields}
                    value={fields.lastName}
                />
            </Form.Group>
            <Button type="submit" className="mt-4 align-self-end">
                Post
            </Button>
        </Form>
    );
};

export default AddImageForm;