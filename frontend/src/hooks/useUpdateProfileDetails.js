import { decodedToken, isToken } from "../middleware/ProtectedRoutes.jsx";

export const useUpdateProfileDetails = (file, fields) => {
    const token = isToken();
    const authorId = decodedToken().id;

    const uploadFile = async () => {
        const fileData = new FormData();
        fileData.append('avatar', file);

        try {
            const response = await fetch(`http://localhost:9099/authors/cloud-upload/avatar`,
                {
                    method: 'POST',
                    body: fileData,
                    headers: {
                        'Authorization': `${token}`
                    }
                });

            return await response.json();
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadedFile = await uploadFile();
            const payload = {
                ...fields,
                avatar: uploadedFile.avatar
            };

            const response = await fetch(`http://localhost:9099/authors/update/${authorId}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                }
            });

            return await response.json();
        } catch (e) {
            console.error(e.message);
        } finally {
            window.location.reload();
        }
    };

    return {
        handleSubmit,
    };
};