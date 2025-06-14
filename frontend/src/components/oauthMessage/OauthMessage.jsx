import React from 'react';
import { Spinner } from "react-bootstrap";

const OauthMessage = ({ title, text }) => {
    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <p className='mb-1'>{title}</p>
            <p>{text}</p>
            <Spinner/>
        </div>
    );
};

export default OauthMessage;