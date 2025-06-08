const HTTPException = require('../index');

class CommentsNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No comment found in this collection',
        error = 'Comment not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = CommentsNotFoundException;
