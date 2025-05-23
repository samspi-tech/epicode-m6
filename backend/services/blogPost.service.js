const BlogPostSchema = require('../models/blogPost');
const { calcTotalPages, orderDirection, calcSkip } = require('../utils/order');

const findAllBlogPosts = async (page, pageSize, field, order) => {
    const totalBlogPosts = await BlogPostSchema.countDocuments();
    const totalPages = calcTotalPages(totalBlogPosts, pageSize);

    const blogPosts = await BlogPostSchema.find()
        .sort(orderDirection(field, order))
        .limit(pageSize)
        .skip(calcSkip(page, pageSize));

    return {
        blogPosts,
        totalPages,
        totalBlogPosts,
    };
};

const findSingleBlogPost = async (id) => {
    return BlogPostSchema.findById(id);
};

const createBlogPost = async (post) => {
    const newPost = new BlogPostSchema(post);
    return await newPost.save();
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
