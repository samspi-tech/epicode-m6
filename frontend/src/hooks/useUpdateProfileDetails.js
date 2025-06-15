import { isToken } from "../middleware/ProtectedRoutes.jsx";
import { useState } from "react";

export const useUpdateProfileDetails = (filePayload) => {
    const token = isToken();
    const [file, setFile] = useState(null);

    const handleFileValue = e => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async (dataName, modelName) => {
        const fileData = new FormData();
        fileData.append(dataName, file);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/${modelName}/cloud-upload/${dataName}`,
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

    const updateWithCloudinaryImage = async (dataName, modelName, id) => {
        try {
            const payload = await filePayload();

            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/${modelName}/update/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                }
            });

            return await response.json();
        } catch (e) {
            console.log(e.message);
        } finally {
            window.location.reload();
        }
    }

    return {
        uploadFile,
        handleFileValue,
        updateWithCloudinaryImage
    };
};