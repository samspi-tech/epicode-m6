const mongoose = require('mongoose');
const HTTPException = require('../exceptions/index');

const errorHandler = (err, req, res, next) => {
    switch (true) {
        case err instanceof HTTPException: {
            return res
                .status(err.statusCode)
                .send({
                    statusCode: err.statusCode,
                    message: err.message,
                    error: err.error,
                });
        }
        case err.code === 11000: {
            const { keyValue } = err;
            const [[key, value]] = Object.entries(keyValue);

            const field = key
                .slice(0, 1)
                .toUpperCase() + key.slice(1);

            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: `${field} '${value}' already exists, please try something different.`,
                    error: 'Duplicate field',
                });
        }
        case err instanceof mongoose.Error.CastError: {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: 'Please check if your id is correct',
                    error: 'Mongoose CastError',
                });
        }
        default: {
            res
                .status(500)
                .send({
                    statusCode: 500,
                    message: 'An error has occurred, please try again later or contact support',
                    error: 'Internal server error',
                });
        }
    }
};

module.exports = errorHandler;
