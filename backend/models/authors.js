const mongoose = require('mongoose');

const AuthorsSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 100,
        },
        lastName: {
            type: String,
            required: true,
            max: 100,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            max: 100,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            unique: true,
            required: true,
            max: 100,
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('author', AuthorsSchema, 'authors');
