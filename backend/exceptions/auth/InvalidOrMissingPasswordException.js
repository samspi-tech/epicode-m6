const HTTPException = require('../index');

class InvalidPasswordException extends HTTPException {
    constructor(
        statusCode = 401,
        message = 'Please provide valid email and password',
        error = 'Invalid email or password',
    ) {
        super(message, statusCode, error);
    }
}

module.exports = InvalidPasswordException;