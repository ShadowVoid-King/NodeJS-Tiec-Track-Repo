const mongoose = require('mongoose');

const groups = new mongoose.Schema({
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
    }, post: {
        type: String,
        required: true,
        ref: 'posts',
    }
}, {
    timestamps: true
});

const groupsData = mongoose.model('groups', groups);
module.exports = { groupsData }