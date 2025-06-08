const { isArrayEmpty } = require("../utils/array");
const commentService = require('../services/comment.service');
const CommentsNotFoundException = require('../exceptions/comments/CommentsNotFoundException');

const getAllCommentsFromSingleBlogPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const blogPostComments = await commentService.findCommentsFromSingleBlogPost(postId);

        if (isArrayEmpty(blogPostComments)) throw new CommentsNotFoundException();

        res
            .status(200)
            .send({
                statusCode: 200,
                blogPostComments
            });
    } catch (e) {
        next(e);
    }
};

const getSingleCommentFromSinglePost = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const singleComment = await commentService.findSingleCommentFromSingleBlogPost(postId, commentId);

        if (isArrayEmpty(singleComment)) throw new CommentsNotFoundException();

        res
            .status(200)
            .send({
                statusCode: 200,
                singleComment
            });
    } catch (e) {
        next(e);
    }
};

const createComment = async (req, res, next) => {
    try {
        const { body } = req;
        const { postId } = req.params;

        const payload = {
            ...body,
            blogPost: postId
        };

        const newComment = await commentService.createComment(payload, postId);

        res
            .status(201)
            .send({
                statusCode: 201,
                message: 'Comment created successfully',
                newComment
            });
    } catch (e) {
        next(e);
        console.log(e);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const { body } = req;
        const { postId, commentId } = req.params;
        const commentToUpdate = await commentService.updateComment(postId, commentId, body);

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Comment updated successfully',
                commentToUpdate
            });
    } catch (e) {
        next(e);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        await commentService.deleteComment(postId, commentId);

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Comment deleted successfully'
            });
    } catch (e) {
        next(e);
        console.log(e);
    }
};

module.exports = {
    getAllCommentsFromSingleBlogPost,
    getSingleCommentFromSinglePost,
    createComment,
    updateComment,
    deleteComment
};