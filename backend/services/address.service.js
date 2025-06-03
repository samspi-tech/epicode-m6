const AuthorSchema = require('../models/authors');
const AddressSchema = require('../models/address');

const findAll = async () => {
    return AddressSchema
        .find()
        .populate('author');
};

const createAddress = async (address, id) => {
    const author = await AuthorSchema.findById(id);
    const newAddress = new AddressSchema(address);
    const authorAddress = await newAddress.save();

    await AuthorSchema.updateOne(
        { _id: author._id },
        { $push: { address: authorAddress } });

    return authorAddress;
};

module.exports = {
    findAll,
    createAddress
};
