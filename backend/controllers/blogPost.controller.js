const { isArrayEmpty } = require('../utils/array');
const blogPostsService = require('../services/blogPost.service');
const BlogPostNotFoundException = require('../exceptions/blogPosts/blogPostsNotFoundException');

const EmailService = require('../services/email.service');
const email = new EmailService();

const getAllBlogPosts = async (req, res, next) => {
    try {
        const {
            title,
            page = 1,
            pageSize = 10,
            field = 'category',
            order = 'asc',
        } = req.query;

        const {
            blogPosts,
            totalPages,
            totalBlogPosts
        } = await blogPostsService.findAllBlogPosts(title, page, pageSize, field, order);

        if (isArrayEmpty(blogPosts)) {
            throw new BlogPostNotFoundException();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                blogPosts,
                page,
                pageSize,
                totalPages,
                totalBlogPosts,
                field,
                order,
            });
    } catch (e) {
        next(e);
    }
};

const getSingleBlogPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await blogPostsService.findSingleBlogPost(id);

        if (!post) {
            throw new BlogPostNotFoundException();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                post,
            });
    } catch (e) {
        next(e);
    }
};

const getAuthorBlogPosts = async (req, res, next) => {
    try {
        const { authorId } = req.params;

        const authorBlogPosts = await blogPostsService.findAuthorBlogPosts(authorId);

        res
            .status(200)
            .send({
                statusCode: 200,
                authorBlogPosts
            });
    } catch (e) {
        next(e);
    }
};

const createBlogPost = async (req, res, next) => {
    try {
        const { body } = req;
        const { authorId } = req.params;
        const { email: recipient } = body;

        const payload = {
            ...body,
            author: authorId
        };

        const newPost = await blogPostsService.createBlogPost(payload, authorId);


        await email.send(
            `${recipient}`,
            'Blog Post Creation',
            'Thank you for sharing your thoughts!',
        );

        res
            .status(201)
            .send({
                statusCode: 201,
                message: 'Post created successfully',
                newPost,
            });
    } catch (e) {
        next(e);
    }
};

const updateBlogPost = async (req, res, next) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const post = await blogPostsService.updateBlogPost(id, body);

        if (!post) throw new BlogPostNotFoundException();

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Post updated successfully',
                post,
            });
    } catch (e) {
        next(e);
    }
};

const deleteBlogPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await blogPostsService.deleteBlogPost(id);

        if (!post) {
            throw new BlogPostNotFoundException();
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Post deleted successfully',
                post,
            });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllBlogPosts,
    getSingleBlogPost,
    getAuthorBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
