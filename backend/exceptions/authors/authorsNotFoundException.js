const HTTPException = require('../index');

class AuthorsNotFoundException extends HTTPException {
    constructor(
        statusCode = 404,
        message = 'No authors found in this collection',
        error = 'Authors not found',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = AuthorsNotFoundException;
