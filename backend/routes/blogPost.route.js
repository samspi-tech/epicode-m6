const express = require('express');
const blogPosts = express.Router();
const validation = require('../utils/validation');
const blogPostsController = require('../controllers/blogPost.controller');

blogPosts.get('/title', blogPostsController.getAllBlogPosts);
blogPosts.get('/:id', blogPostsController.getSingleBlogPost);
blogPosts.post('/create/:id', validation('createBlogPost'), blogPostsController.createBlogPost);
blogPosts.patch('/update/:id', validation('updateBlogPost'), blogPostsController.updateBlogPost);
blogPosts.delete('/delete/:id', blogPostsController.deleteBlogPost);

module.exports = blogPosts;
