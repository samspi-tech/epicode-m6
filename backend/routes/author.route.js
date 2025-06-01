const express = require('express');
const authors = express.Router();
const validation = require('../utils/validation');
const authorsController = require('../controllers/author.controller');


authors.get('/', authorsController.getAllAuthors);
authors.get('/:id', authorsController.getSingleAuthor);
authors.post('/create', validation('createAuthor'), authorsController.createAuthor);
authors.post('/login', authorsController.loginAuthor);
authors.patch('/update/:id', validation('updateAuthor'), authorsController.updateAuthor);
authors.delete('/delete/:id', authorsController.deleteAuthor);

module.exports = authors;
