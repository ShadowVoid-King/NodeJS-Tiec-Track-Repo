const mongoose = require('mongoose');

const posts = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const postsData = mongoose.model('posts', posts);
module.exports = { postsData }