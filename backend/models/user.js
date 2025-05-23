const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
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
        password: {
            type: String,
            required: true,
            min: 8,
        },
        dateOfBirth: {
            type: Date,
            default: new Date(),
        },
        username: {
            type: String,
            unique: true,
            required: true,
            max: 100,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('user', UserSchema, 'users');
