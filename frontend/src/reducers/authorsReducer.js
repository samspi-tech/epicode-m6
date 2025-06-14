export const initialState = {
    data: null,
    status: 'loading',
    message: '',
    payload: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: ''
    }
};

export const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'dataReceived': {
            return {
                ...state,
                data: action.payload,
                status: 'ready'
            };
        }
        case 'dataFailed': {
            return {
                ...state,
                status: 'error',
                message: action.message
            };
        }
        case 'signup': {
            return {
                ...state,
                status: 'signup',
                payload: action.payload
            }
        }
        default: {
            throw new Error('Action is unknown');
        }
    }
};