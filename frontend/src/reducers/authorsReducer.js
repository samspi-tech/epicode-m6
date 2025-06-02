export const initialState = {
    data: null,
    token: null,
    author: null,
    status: 'loading',
    signupPayload: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: '',
        avatar: ''
    },
    loginPayload: {
        email: '',
        password: ''
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

        case 'singleAuthor':
            return {
                ...state,
                author: action.payload
            };

        case 'tokenReceived':
            return {
                ...state,
                token: action.payload
            };

        case 'dataFailed':
            return {
                ...state,
                status: 'error',
                message: action.message
            };

        case 'setSignupPayload':
            return {
                ...state,
                signupPayload: action.payload
            };

        case 'setLoginPayload':
            return {
                ...state,
                loginPayload: action.payload,
                status: 'logged'
            };

        default:
            throw new Error('Action is unknown');
    }
};