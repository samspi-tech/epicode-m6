import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const [payload, setPayload] = useState({
        email: '',
        password: ''
    });

    const handlePayload = e => {
        const { name, value } = e.target;

        setPayload({
            ...payload,
            [name]: value
        });
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:9099/auth/login',
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            const jsonResponse = await response.json();

            if (response.ok) {
                localStorage.setItem('token', JSON.stringify(jsonResponse.token));

                setTimeout(() => {
                    navigate('/homepage', { replace: true })
                }, 1000);
            } else {
                throw new Error(`${jsonResponse.message}`)
            }

            return jsonResponse
        } catch (e) {
            setError(e.message);
        }
    };

    return {
        payload,
        error,
        handlePayload,
        login,
    };
};