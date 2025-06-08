const { body, validationResult } = require('express-validator');

const authorBodyValidation = [
    body('firstName')
        .isString()
        .withMessage('FirstName must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage("FirstName can't be empty or longer than 100 chars"),
    body('lastName')
        .isString()
        .withMessage('LastName must be a string')
        .isLength({ min: 1, max: 100 })
        .withMessage("LastName can't be empty or longer than 100 chars"),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .isLength({ min: 8 })
        .withMessage("Password can't be shorter than 8 chars")
        .isString()
        .withMessage('Password must be a string'),
    body('dateOfBirth')
        .notEmpty()
        .withMessage("DateOfBirth can't be empty")
        .isDate()
        .withMessage('DateOfBirth must be a valid date (year-month-day)'),
    body('avatar')
        .optional()
        .default('https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
        .isURL()
        .withMessage('Avatar must be a valid URL'),
];

const authorBodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send({ ...errors });
    }
    next();
};

module.exports = {
    authorBodyValidation,
    authorBodyValidator,
};
