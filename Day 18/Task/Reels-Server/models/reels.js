const mongoose = require('mongoose');

const reels = new mongoose.Schema({
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
    }, urlVideo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const reelsData = mongoose.model('reels', reels);

module.exports = { reelsData }