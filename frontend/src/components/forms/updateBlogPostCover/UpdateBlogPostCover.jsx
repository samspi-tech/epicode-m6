import { Button, Form } from "react-bootstrap";
import { useUpdateProfileDetails } from "../../../hooks/useUpdateProfileDetails.js";

const UpdateBlogPostCover = ({ postId }) => {
    const filePayload = async () => {
        const uploadedFile = await uploadFile('cover', 'blogPosts');

        return { cover: uploadedFile.image };
    };

    const {
        uploadFile,
        handleFileValue,
        updateWithCloudinaryImage
    } = useUpdateProfileDetails(filePayload);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateWithCloudinaryImage('cover', 'blogPosts', postId);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
            className="my-2 d-flex flex-column"
        >
            <Form.Group>
                <Form.Control
                    type="file"
                    name="cover"
                    onChange={handleFileValue}
                />
            </Form.Group>
            <Button type="submit" className="mt-4 align-self-end">
                Update
            </Button>
        </Form>
    );
};

export default UpdateBlogPostCover;
