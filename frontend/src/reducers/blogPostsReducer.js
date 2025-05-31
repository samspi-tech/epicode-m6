export const initialState = {
    data: null,
    message: '',
    status: 'loading',
    page: 1
};

export const blogPostReducer = (state, action) => {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                status: 'ready',
                data: action.payload
            };

        case 'dataFailed':
            return {
                ...state,
                status: 'error',
                message: action.message
            };

        case 'nextPage':
            return {
                ...state,
                page: state.page + 1
            };

        case 'prevPage':
            return {
                ...state,
                page: state.page - 1
            };

        default:
            throw new Error('Action is unknown');
    }
};