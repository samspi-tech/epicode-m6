const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AuthorsSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxLength: 100,
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 100,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            maxLength: 100,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            select: false
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        address: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address'
        }],
        blogPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogPost'
        }]
    },
    { timestamps: true, strict: true },
);

AuthorsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('author', AuthorsSchema, 'authors');
