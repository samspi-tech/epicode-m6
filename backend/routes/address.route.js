const express = require('express');
const address = express.Router();
const addressController = require('../controllers/address.controller');

address.get('/', addressController.getAllAddresses);
address.post('/create/:id', addressController.createNewAddress);

module.exports = address;
