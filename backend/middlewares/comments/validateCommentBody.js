const { body, validationResult } = require('express-validator');

const commentBodyValidation = [
    body('comment')
        .isString()
        .withMessage('Comment must be a string')
        .notEmpty()
        .withMessage("Comment can't be empty"),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer number and it must be between 1 and 5')
        .isLength({ min: 1, max: 1 })
        .withMessage("Rating can't be empty and it must be a number between 1 and 5")
];

const commentBodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send({ ...errors });
    }
    next();
};

module.exports = {
    commentBodyValidation,
    commentBodyValidator
};