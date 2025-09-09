const { reviewOrder } = require("../models/reviews");


const reviewOrderController = async (req, res) => {
    const { email, comment, rating } = req.body;
    try {
        const review = new reviewOrder({ email, comment, rating });
        await review.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};

module.exports = { reviewOrderController };