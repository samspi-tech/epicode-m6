const express = require('express');
const blogPosts = express.Router();
const blogPostsController = require('../controllers/blogPost.controller');

blogPosts.get('/blogPosts/title', blogPostsController.getAllBlogPosts);
blogPosts.get('/blogPosts/:id', blogPostsController.getSingleBlogPost);
blogPosts.post('/blogPosts/create', blogPostsController.createBlogPost);
blogPosts.patch('/blogPosts/update/:id', blogPostsController.updateBlogPost);
blogPosts.delete('/blogPosts/delete/:id', blogPostsController.deleteBlogPost);

module.exports = blogPosts;
