const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogPost'
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('comment', CommentSchema, 'comments');
