const AuthorSchema = require('../models/authors');
const BlogPostSchema = require('../models/blogPost');
const { calcTotalPages, orderDirection, calcSkip } = require('../utils/order');
const AuthorNotFoundException = require('../exceptions/authors/authorsNotFoundException');

const findAllBlogPosts = async (title = '', page, pageSize, field, order) => {
    const totalBlogPosts = await BlogPostSchema.countDocuments();
    const totalPages = calcTotalPages(totalBlogPosts, pageSize);

    const query = {
        title: {
            $regex: `${title}`,
            $options: 'i',
        }
    };

    const findTitle = title === '' ? null : query;

    const blogPosts = await BlogPostSchema
        .find(findTitle)
        .sort(orderDirection(field, order))
        .limit(pageSize)
        .skip(calcSkip(page, pageSize))
        .populate('author', ['firstName', 'lastName'])
        .populate('comments', ['comment', 'vote']);

    return {
        blogPosts,
        totalPages,
        totalBlogPosts,
    };
};

const findSingleBlogPost = async (postId) => {
    return BlogPostSchema
        .findById(postId)
        .populate('comments');
};

const createBlogPost = async (postPayload, authorId) => {
    const author = await AuthorSchema.findById(authorId);
    if (!author) throw new AuthorNotFoundException();

    const newPost = new BlogPostSchema(postPayload);
    const authorBlogPost = await newPost.save();

    await AuthorSchema.updateOne(
        { _id: author._id },
        { $push: { blogPosts: authorBlogPost } });

    return authorBlogPost;
};

const updateBlogPost = async (postId, postPayload) => {
    const option = { new: true };
    return BlogPostSchema.findByIdAndUpdate(postId, postPayload, option);
};

const deleteBlogPost = async (postId) => {
    return BlogPostSchema.findByIdAndDelete(postId);
};

module.exports = {
    findAllBlogPosts,
    findSingleBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
