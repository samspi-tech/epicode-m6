import './welcome.css'

const Welcome = () => {
    return (
        <div className='welcome-container d-flex justify-content-center'>
            <div className='welcome-message fw-semibold shadow'>
                <p className='mb-0'>Congratulations!</p>
                <p className='mb-0'>You are now signup to our website.</p>
                <p className='mb-0'>Now you can login using your credentials!</p>
            </div>
        </div>
    );
};

export default Welcome;