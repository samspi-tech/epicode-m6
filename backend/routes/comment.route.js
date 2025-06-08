const express = require('express');
const comment = express.Router();
const validation = require('../utils/validation');
const commentController = require('../controllers/comments.controller');

comment.get('/:postId/comments', commentController.getAllCommentsFromSingleBlogPost);
comment.get('/:postId/comment/:commentId', commentController.getSingleCommentFromSinglePost);
comment.post('/create/:postId', validation('createComment'), commentController.createComment);
comment.patch('/update/:postId/comment/:commentId', validation('updateComment'), commentController.updateComment);
comment.delete('/delete/:postId/comment/:commentId', commentController.deleteComment);

module.exports = comment;
