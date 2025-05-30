const { isArrayEmpty } = require('../utils/array');
const blogPostsService = require('../services/blogPost.service');
const BlogPostNotFound = require('../exceptions/blogPosts/blogPostsNotFoundException');

const EmailService = require('../services/email.service');
const email = new EmailService();

const getAllBlogPosts = async (req, res, next) => {
    try {
        const {
            q,
            page = 1,
            pageSize = 10,
            field = 'category',
            order = 'asc',
        } = req.query;

        const {
            blogPosts,
            totalPages,
            totalBlogPosts
        } = await blogPostsService.findAllBlogPosts(
            q,
            page,
            pageSize,
            field,
            order,
        );

        if (isArrayEmpty(blogPosts)) {
            throw new BlogPostNotFound();
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
            throw new BlogPostNotFound();
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

const createBlogPost = async (req, res, next) => {
    try {
        const { body } = req;
        const { author: recipient } = body;
        const post = await blogPostsService.createBlogPost(body);

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
                post,
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

        if (!post) {
            throw new BlogPostNotFound();
        }

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
            throw new BlogPostNotFound();
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
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
