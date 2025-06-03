const AuthorSchema = require('../models/authors');
const BlogPostSchema = require('../models/blogPost');
const { calcTotalPages, orderDirection, calcSkip } = require('../utils/order');

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
        .populate('author');

    return {
        blogPosts,
        totalPages,
        totalBlogPosts,
    };
};

const findSingleBlogPost = async (id) => {
    return BlogPostSchema.findById(id);
};

const createBlogPost = async (post, id) => {
    const author = await AuthorSchema.findById(id);
    const newPost = new BlogPostSchema(post);
    const authorPost = await newPost.save();

    await AuthorSchema.updateOne(
        { _id: author._id },
        { $push: { blogPosts: authorPost } });

    return authorPost;
};

const updateBlogPost = async (id, payload) => {
    const option = { new: true };
    return BlogPostSchema.findByIdAndUpdate(id, payload, option);
};

const deleteBlogPost = async (id) => {
    return BlogPostSchema.findByIdAndDelete(id);
};

module.exports = {
    findAllBlogPosts,
    findSingleBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
