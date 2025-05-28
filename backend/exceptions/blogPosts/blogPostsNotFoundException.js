const HTTPException = require('../index');

class BlogPostsNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No blog post found in this collection',
        error = 'Blog post not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = BlogPostsNotFoundException;
