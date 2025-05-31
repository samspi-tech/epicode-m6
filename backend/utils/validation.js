const {
    authorBodyValidation,
    authorBodyValidator,
} = require('../middlewares/authors/validateAuthorBody');

const {
    updateAuthorBodyValidation,
    updateAuthorBodyValidator,
} = require('../middlewares/authors/validateAuthorBodyUpdate');

const {
    blogPostBodyValidation,
    blogPostBodyValidator,
} = require('../middlewares/blogPosts/validateBlogPostBody');

const {
    updateBlogPostBodyValidation,
    updateBlogPostBodyValidator,
} = require('../middlewares/blogPosts/validateBlogPostBodyUpdate');

const parser = require("../middlewares/multer/uploadMiddleware");

const validation = (middleware) => {
    switch (middleware) {
        case 'createAuthor': {
            return [authorBodyValidation, authorBodyValidator];
        }
        case 'updateAuthor': {
            return [updateAuthorBodyValidation, updateAuthorBodyValidator, parser.single('avatar')];
        }
        case 'createBlogPost': {
            return [blogPostBodyValidation, blogPostBodyValidator];
        }
        case 'updateBlogPost': {
            return [updateBlogPostBodyValidation, updateBlogPostBodyValidator];
        }
    }
};

module.exports = validation;
