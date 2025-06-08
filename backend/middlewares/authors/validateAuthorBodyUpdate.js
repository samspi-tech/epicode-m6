const { body, validationResult } = require('express-validator');

const authorBodyUpdateValidation = [
    body('firstName')
        .optional()
        .isString()
        .withMessage('FirstName must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage("FirstName can't be empty or longer than 100 chars"),
    body('lastName')
        .optional()
        .isString()
        .withMessage('LastName must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage("LastName can't be empty or longer than 100 chars"),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Email must be valid'),
    body('dateOfBirth')
        .optional()
        .isDate()
        .withMessage('DateOfBirth must be a valid date (year-month-day)'),
    body('avatar')
        .optional()
        .isURL()
        .withMessage('Avatar must be a valid URL'),
];

const authorBodyUpdateValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send({ ...errors });
    }
    next();
};

module.exports = {
    authorBodyUpdateValidation,
    authorBodyUpdateValidator
};
