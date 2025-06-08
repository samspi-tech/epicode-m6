const CommentSchema = require('../models/comments');
const BlogPostSchema = require('../models/blogPost');
const CommentsNotFoundException = require('../exceptions/comments/CommentsNotFoundException');
const BlogPostNotFoundException = require('../exceptions/blogPosts/blogPostsNotFoundException');


const findCommentsFromSingleBlogPost = async (postId) => {
    return CommentSchema.find({ blogPost: postId });
};

const findSingleCommentFromSingleBlogPost = async (postId, commentId) => {
    return CommentSchema.find(
        {
            blogPost: postId,
            _id: commentId
        });
};


const createComment = async (commentBody, postId) => {
    const blogPost = await BlogPostSchema.findById(postId);
    if (!blogPost) throw new BlogPostNotFoundException();

    const newComment = new CommentSchema(commentBody);
    const savedComment = await newComment.save();

    await BlogPostSchema.updateOne(
        { _id: blogPost._id },
        { $push: { comments: savedComment } }
    );

    return savedComment;
};

const updateComment = async (postId, commentId, commentBody) => {
    const blogPost = await BlogPostSchema.findById(postId);
    if (!blogPost) throw new BlogPostNotFoundException();

    const option = { new: true };
    const commentToUpdate = await CommentSchema.findOneAndUpdate(
        {
            blogPost: blogPost._id,
            _id: commentId
        },
        commentBody,
        option
    );
    if (!commentToUpdate) throw new CommentsNotFoundException();

    return commentToUpdate;
};

const deleteComment = async (postId, commentId) => {
    const blogPost = await BlogPostSchema.findById(postId);
    if (!blogPost) throw new BlogPostNotFoundException();

    const commentToDelete = await CommentSchema.findByIdAndDelete(commentId);
    if (!commentToDelete) throw new CommentsNotFoundException();

    await BlogPostSchema.updateOne(
        { _id: blogPost._id },
        { $pull: { comments: commentToDelete._id } }
    );

    return commentToDelete;
};

module.exports = {
    findCommentsFromSingleBlogPost,
    findSingleCommentFromSingleBlogPost,
    createComment,
    updateComment,
    deleteComment
};