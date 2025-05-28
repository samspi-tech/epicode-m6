const {
    authorBodyValidation,
    authorBodyValidator,
} = require('../middlewares/validateAuthorBody');

const {
    updateAuthorBodyValidation,
    updateAuthorBodyValidator,
} = require('../middlewares/validateAuthorBodyUpdate');

const {
    blogPostBodyValidation,
    blogPostBodyValidator,
} = require('../middlewares/validateBlogPostBody');

const {
    updateBlogPostBodyValidation,
    updateBlogPostBodyValidator,
} = require('../middlewares/validateBlogPostBodyUpdate');

const validation = (middleware) => {
    switch (middleware) {
        case 'createAuthor': {
            return [authorBodyValidation, authorBodyValidator];
        }
        case 'updateAuthor': {
            return [updateAuthorBodyValidation, updateAuthorBodyValidator];
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
