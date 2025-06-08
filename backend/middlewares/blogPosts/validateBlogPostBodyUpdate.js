const { body, validationResult } = require('express-validator');

const blogPostBodyUpdateValidation = [
    body('category')
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage("Category can't be empty")
        .isString()
        .withMessage('Category must be a string'),
    body('title')
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage("Title can't be empty")
        .isString()
        .withMessage('Title must be a string'),
    body('cover')
        .optional()
        .isURL()
        .withMessage('Cover must be a valid URL'),
    body('readTime.value')
        .optional()
        .isLength({ min: 1 })
        .withMessage("Value can't be empty")
        .isInt()
        .withMessage('Value must be an integer number'),
    body('author')
        .optional()
        .isEmail()
        .withMessage('Author must be a valid email'),
    body('content')
        .optional()
        .isLength({ min: 1 })
        .withMessage("Content can't be empty")
        .isString()
        .withMessage('Content must be a string'),
];

const blogPostBodyUpdateValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send({ ...errors });
    }
    next();
};

module.exports = {
    blogPostBodyUpdateValidation,
    blogPostBodyUpdateValidator
};
