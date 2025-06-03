const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
        city: {
            type: String,
            required: true,
        },
        cap: {
            type: Number,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author'
        }
    },
    { timestamps: true, strict: true }
);

module.exports = mongoose.model('address', AddressSchema, 'addresses');