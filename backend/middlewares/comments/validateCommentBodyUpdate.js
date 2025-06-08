const { body, validationResult } = require('express-validator');

const commentBodyUpdateValidation = [
    body('comment')
        .optional()
        .notEmpty()
        .withMessage("Comment can't be empty")
        .isString()
        .withMessage('Comment must be a string'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer number and it must be between 1 and 5')
        .isLength({ min: 1, max: 1 })
        .withMessage("Rating can't be empty and it must be a number between 1 and 5")
];

const commentBodyUpdateValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send({ ...errors });
    }
    next();
};

module.exports = {
    commentBodyUpdateValidation,
    commentBodyUpdateValidator
};