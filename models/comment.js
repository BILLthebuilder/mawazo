const mongoose = require('mongoose');
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    createdAt: {
        type: String,
        default: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
