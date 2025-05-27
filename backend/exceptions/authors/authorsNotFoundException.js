const HTTPException = require('../index');

class AuthorsNotFoundException extends HTTPException {
    constructor(
        message = 'Authors not found',
        statusCode = 404,
        error = 'Not authors found in this collection',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = AuthorsNotFoundException;
