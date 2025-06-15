import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { isAuthorId } from "../../../middleware/ProtectedRoutes.jsx";
import { AuthorsContext } from "../../../contexts/AuthorsContext.jsx";
import { useUpdateProfileDetails } from '../../../hooks/useUpdateProfileDetails.js';

const UpdateAuthorDetails = () => {
    const authorId = isAuthorId();
    const { data } = useContext(AuthorsContext);

    const [fields, setFields] = useState({
        firstName: `${data.firstName}`,
        lastName: `${data.lastName}`
    });

    const filePayload = async () => {
        const uploadedFile = await uploadFile('avatar', 'authors');

        return {
            ...fields,
            avatar: uploadedFile.image
        };
    };

    const {
        uploadFile,
        handleFileValue,
        updateWithCloudinaryImage
    } = useUpdateProfileDetails(filePayload);


    const handleFields = e => {
        const { name, value } = e.target;

        setFields({
            ...fields,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateWithCloudinaryImage('avatar', 'authors', authorId);
    }

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
                    required
                    type="text"
                    name="firstName"
                    onChange={handleFields}
                    value={fields.firstName}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="lastName"
                    onChange={handleFields}
                    value={fields.lastName}
                />
            </Form.Group>
            <Button type="submit" className="mt-4 align-self-end">
                Update
            </Button>
        </Form>
    );
};

export default UpdateAuthorDetails;