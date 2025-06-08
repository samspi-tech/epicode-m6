const {
    authorBodyValidation,
    authorBodyValidator,
} = require('../middlewares/authors/validateAuthorBody');

const {
    authorBodyUpdateValidation,
    authorBodyUpdateValidator,
} = require('../middlewares/authors/validateAuthorBodyUpdate');

const {
    blogPostBodyValidation,
    blogPostBodyValidator,
} = require('../middlewares/blogPosts/validateBlogPostBody');

const {
    blogPostBodyUpdateValidation,
    blogPostBodyUpdateValidator,
} = require('../middlewares/blogPosts/validateBlogPostBodyUpdate');

const {
    commentBodyValidation,
    commentBodyValidator
} = require('../middlewares/comments/validateCommentBody');

const {
    commentBodyUpdateValidation,
    commentBodyUpdateValidator
} = require('../middlewares/comments/validateCommentBodyUpdate');

const validation = (bodyValidation) => {
    switch (bodyValidation) {
        case 'createAuthor': {
            return [authorBodyValidation, authorBodyValidator];
        }
        case 'updateAuthor': {
            return [authorBodyUpdateValidation, authorBodyUpdateValidator];
        }
        case 'createBlogPost': {
            return [blogPostBodyValidation, blogPostBodyValidator];
        }
        case 'updateBlogPost': {
            return [blogPostBodyUpdateValidation, blogPostBodyUpdateValidator];
        }
        case 'createComment': {
            return [commentBodyValidation, commentBodyValidator];
        }
        case 'updateComment': {
            return [commentBodyUpdateValidation, commentBodyUpdateValidator];
        }
    }
};

module.exports = validation;
