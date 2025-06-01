const HTTPException = require('../index');

class MissingLoginInput extends HTTPException {
    constructor(
        statusCode = 400,
        message = 'Please provide email and password',
        error = 'Missing email or password'
    ) {
        super(message, statusCode, error);
    }
}

module.exports = MissingLoginInput;