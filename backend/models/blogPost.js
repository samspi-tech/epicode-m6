const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            max: 100,
        },
        title: {
            type: String,
            unique: true,
            required: true,
            max: 100,
        },
        cover: {
            type: String,
            default: 'https://picsum.photos/200/300',
            match: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
        },
        readTime: {
            value: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                default: 'min',
            },
        },
        author: {
            type: String,
            required: true,
            max: 100,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('blogPost', BlogPostSchema, 'blogPosts');
