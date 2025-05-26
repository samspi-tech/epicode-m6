const express = require('express');
const authors = express.Router();
const usersController = require('../controllers/author.controller');

authors.get('/authors', usersController.getAllAuthors);
authors.get('/authors/:id', usersController.getSingleAuthor);
authors.post('/authors/create', usersController.createAuthor);
authors.patch('/authors/update/:id', usersController.updateAuthor);
authors.delete('/authors/delete/:id', usersController.deleteAuthor);

module.exports = authors;
