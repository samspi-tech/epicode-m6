const mongoose = require('mongoose');
const HTTPException = require('../exceptions/index');

const errorHandler = (err, req, res, next) => {
    if (err instanceof HTTPException) {
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message,
            error: err.error,
        });
    }

    if (err.code === 11000) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Field already exists, please try something different',
            error: 'Duplicate field',
        });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Please check if your id is correct',
            error: 'Mongoose CastError',
        });
    }

    res.status(500).send({
        statusCode: 500,
        message:
            'An error has occurred, please try again later or contact support',
        error: 'Internal server error',
    });
};

module.exports = errorHandler;
