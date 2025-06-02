export const useUpdateProfileDetails = (file) => {
    const uploadFile = async () => {
        const fileData = new FormData();
        fileData.append('avatar', file);

        try {
            const response = await fetch(`http://localhost:9099/authors/cloud-upload/avatar`, {
                method: 'POST',
                body: fileData
            });

            return await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadedFile = await uploadFile();
            const payload = {
                avatar: uploadedFile.avatar
            };

            const response = await fetch(`http://localhost:9099/authors/update/683dde6b07f9e877597b2dd5`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            return await response.json();
        } catch (e) {
            console.error(e);
        } finally {
            window.location.reload();
        }
    };

    return { handleSubmit };
};