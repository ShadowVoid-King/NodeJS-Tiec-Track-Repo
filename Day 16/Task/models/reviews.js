const mongoose = require('mongoose');

const reviewOrder = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// one review per order
reviewOrder.index({ orderId: 1, email: 1 }, { unique: true });

const reviewData = mongoose.model("Review", reviewOrder);

module.exports = { reviewData };