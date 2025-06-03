const { isArrayEmpty } = require("../utils/array");
const addressService = require('../services/address.service');

const getAllAddresses = async (req, res, next) => {
    try {
        const addresses = await addressService.findAll();

        if (isArrayEmpty(addresses)) {
            throw new Error('No addresses');
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                addresses,
            });
    } catch (e) {
        next(e);
    }
};

const createNewAddress = async (req, res, next) => {
    try {
        const { body } = req;
        const { id } = req.params;

        const payload = {
            ...body,
            author: id
        };

        const newAddress = await addressService.createAddress(payload, id);

        res
            .status(201)
            .send({
                statusCode: 201,
                message: "Address created successfully",
                newAddress
            });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllAddresses,
    createNewAddress
};
