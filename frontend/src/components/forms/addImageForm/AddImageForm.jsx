import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useUpdateProfileDetails } from '../../../hooks/useUpdateProfileDetails.js';

const AddImageForm = () => {
    const [file, setFile] = useState(null);
    const { handleSubmit } = useUpdateProfileDetails(file);

    const handleFileValue = e => {
        setFile(e.target.files[0]);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="my-2 d-flex flex-column"
        >
            <input
                required
                type="file"
                name="avatar"
                onChange={handleFileValue}
            />
            <Button type="submit" className="mt-4 align-self-end">
                Post
            </Button>
        </Form>
    );
};

export default AddImageForm;