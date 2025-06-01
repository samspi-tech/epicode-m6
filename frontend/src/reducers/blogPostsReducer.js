export const initialState = {
    data: null,
    status: 'loading',
    message: '',
    page: 1,
    title: '',
    payload: {
        cover: '',
        title: '',
        author: '',
        content: '',
        category: '',
        readTime: { value: 1 }
    }
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

        case 'setPayload':
            return {
                ...state,
                payload: action.payload
            };

        case 'searchBlogPost':
            return {
                ...state,
                title: action.query
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