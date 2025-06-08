const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword');

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
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        blogPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogPost'
        }],
    },
    { timestamps: true, strict: true },
);

AuthorsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await hashPassword(this.password);

        next();
    } catch (e) {
        next(e);
    }
});

AuthorsSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        const hashedPassword = await hashPassword(update.password);

        this.setUpdate({
            ...update,
            password: hashedPassword
        });
    }

    next();
});

module.exports = mongoose.model('author', AuthorsSchema, 'authors');
