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
            match: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            default: 'https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    },
    { timestamps: true, strict: true },
);

module.exports = mongoose.model('author', AuthorsSchema, 'authors');
