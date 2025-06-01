const HTTPException = require('../index');

class MissingLoginInput extends HTTPException {
    constructor(
        statusCode = 401,
        message = 'Please provide right email and password',
        error = 'Incorrect email or password'
    ) {
        super(message, statusCode, error);
    }
}

module.exports = MissingLoginInput;