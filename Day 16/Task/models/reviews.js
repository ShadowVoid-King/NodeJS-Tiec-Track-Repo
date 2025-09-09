const mongoose = require('mongoose');

const reviewOrder =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

mongoose.model("Review", reviewOrder);

module.exports = { reviewOrder };