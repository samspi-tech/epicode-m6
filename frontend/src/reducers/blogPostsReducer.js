export const initialState = {
    data: null,
    authorPosts: null,
    status: 'loading',
    message: '',
    page: 1,
    title: '',
    payload: {
        cover: 'https://picsum.photos/200/300',
        title: '',
        email: '',
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

        case 'authorPostsReceived':
            return {
                ...state,
                status: 'ready',
                authorPosts: action.payload
            }

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