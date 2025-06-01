export const initialState = {
    data: null,
    status: 'loading',
    payload: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: '',
        avatar: ''
    }
};

export const authorsReducer = (state, action) => {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                data: action.payload,
                status: 'ready'
            };

        case 'dataFailed':
            return {
                ...state,
                status: 'error',
                message: action.message
            };

        case 'setPayload':
            return {
                ...state,
                payload: action.payload
            };

        default:
            throw new Error('Action is unknown');
    }
};