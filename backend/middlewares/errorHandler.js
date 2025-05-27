const HTTPException = require('../exceptions/index');

const errorHandler = (err, req, res, next) => {
    if (err instanceof HTTPException) {
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message,
            error: err.error,
        });
    }

    res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
        error: 'An error has occurred, please try again or contact support',
    });
};

module.exports = errorHandler;
