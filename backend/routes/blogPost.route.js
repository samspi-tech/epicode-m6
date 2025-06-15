const express = require('express');
const blogPosts = express.Router();
const validation = require('../utils/validation');
const cloudUpload = require('../middlewares/multer/index');
const blogPostsController = require('../controllers/blogPost.controller');
const cloudinaryController = require('../controllers/cloudinary.controller');

blogPosts.get('/', blogPostsController.getAllBlogPosts);
blogPosts.get('/:id', blogPostsController.getSingleBlogPost);
blogPosts.get('/author/:authorId', blogPostsController.getAuthorBlogPosts);
blogPosts.post('/create/:authorId', validation('createBlogPost'), blogPostsController.createBlogPost);
blogPosts.post('/cloud-upload/cover', cloudUpload.single('cover'), cloudinaryController.uploadFileOnCloudinary);
blogPosts.patch('/update/:id', validation('updateBlogPost'), blogPostsController.updateBlogPost);
blogPosts.delete('/delete/:id', blogPostsController.deleteBlogPost);

module.exports = blogPosts;
