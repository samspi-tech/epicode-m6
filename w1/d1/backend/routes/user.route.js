const express = require('express')
const users = express.Router()
const usersController = require('../controllers/user.controller')

users.get('/users', usersController.getAllUsers)
users.post('/users/create', usersController.createUser)
users.patch('/users/update/:id', usersController.updateUser)
users.delete('/users/delete/:id', usersController.deleteUser)

module.exports = users