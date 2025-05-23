const blogPostsService = require('../services/blogPost.service');
const { isArrayEmpty } = require('../utils/array');

const getAllBlogPosts = async (req, res) => {
    try {
        const {
            page = 1,
            pageSize = 10,
            field = 'category',
            order = 'asc',
        } = req.query;

        const { blogPosts, totalPages, totalBlogPosts } =
            await blogPostsService.findAllBlogPosts(
                page,
                pageSize,
                field,
                order,
            );

        if (isArrayEmpty(blogPosts)) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Posts not found',
            });
        }

        res.status(200).send({
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
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const getSingleBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await blogPostsService.findSingleBlogPost(id);

        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Post not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            post,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const createBlogPost = async (req, res) => {
    try {
        const { body } = req;
        const post = await blogPostsService.createBlogPost(body);

        res.status(201).send({
            statusCode: 201,
            message: 'Post created successfully',
            post,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const updateBlogPost = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const post = await blogPostsService.updateBlogPost(id, body);

        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Post not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Post updated successfully',
            post,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await blogPostsService.deleteBlogPost(id);

        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Post not found',
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Post deleted successfully',
            post,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });
    }
};

module.exports = {
    getAllBlogPosts,
    getSingleBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
