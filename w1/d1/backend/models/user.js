const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 100
        },
        lastName: {
            type: String,
            required: true,
            max: 100
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        dateOfBirth: {
            type: Date,
            required: false,
            default: new Date()
        },
        username: {
            type: String,
            required: true,
            max: 100
        },
        role: {
            type: String,
            enum: [ 'user', 'admin' ],
            default: 'user'
        }
    }, { timestamps: true, strict: true }
)

module.exports = mongoose.model( 'user', UserSchema, 'users' )