const express = require('express');
const authors = express.Router();
const validation = require('../utils/validation');
const cloudUpload = require('../middlewares/multer/index');
const authorsController = require('../controllers/author.controller');
const cloudinaryController = require('../controllers/cloudinary.controller');

authors.get('/', authorsController.getAllAuthors);
authors.get('/:id', authorsController.getSingleAuthor);
authors.get('/email/:email', authorsController.getSingleAuthorByEmail);
authors.post('/create', validation('createAuthor'), authorsController.createAuthor);
authors.post('/cloud-upload/avatar', cloudUpload.single('avatar'), cloudinaryController.uploadFileOnCloudinary);
authors.patch('/update/:id', validation('updateAuthor'), authorsController.updateAuthor);
authors.delete('/delete/:id', authorsController.deleteAuthor);

module.exports = authors;
