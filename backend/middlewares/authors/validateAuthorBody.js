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
        .withMessage('Password must be string'),
    body('passwordConfirm')
        .isString()
        .withMessage('PasswordConfirm must be a string')
        .custom((passConfirm, { req }) => {
            const { password } = req.body;
            const isNotMatch = passConfirm !== password;

            if (isNotMatch) {
                throw new Error('Password confirmation does not match password');
            }

            return true;
        }),
    body('dateOfBirth')
        .notEmpty()
        .withMessage("DateOfBirth can't be empty")
        .isDate()
        .withMessage('DateOfBirth must be a valid date (year-month-day)'),
    body('avatar')
        .optional()
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
