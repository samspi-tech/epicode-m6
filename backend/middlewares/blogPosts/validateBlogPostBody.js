const { body, validationResult } = require('express-validator');

const blogPostBodyValidation = [
    body('category')
        .isLength({ min: 1, max: 100 })
        .withMessage("Category can't be empty or longer than 100 chars")
        .isString()
        .withMessage('Category must be a string'),
    body('title')
        .isLength({ min: 1, max: 100 })
        .withMessage("Title can't be empty or longer than 100 chars")
        .isString()
        .withMessage('Title must be a string'),
    body('cover')
        .optional()
        .isURL()
        .withMessage('Cover must be a valid URL'),
    body('readTime.value')
        .notEmpty()
        .withMessage("Value can't be empty")
        .isInt()
        .withMessage('Value must be an integer number'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('content')
        .notEmpty()
        .withMessage("Content can't be empty")
        .isString()
        .withMessage('Content must be a string'),
];

const blogPostBodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send({ ...errors });
    }
    next();
};

module.exports = {
    blogPostBodyValidation,
    blogPostBodyValidator
};
