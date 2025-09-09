const { reviewOrder } = require("../models/reviews");
const { orderData } = require("../models/order");
const {SendEmailToUser} = require("../utils/mailSender")


const reviewOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Order ID is required" });
        }
        const checkOrder = await orderData.findOne({ orderId: id });
        if (!checkOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        const { email, comment, rating } = req.body;
        if (!email || !comment || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (typeof rating !== "number") {
            return res.status(400).json({ message: "Rating must be a number" });
        }
        if ( isNaN(rating)) {
            return res.status(400).json({ message: "Rating must be a number" });
        }
        if ( typeof comment !== "string") {
            return res.status(400).json({ message: "Comment must be a string" });
        }
        if (typeOf(email) !== "string") {
            return res.status(400).json({ message: "Email must be a string" });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        const emailVaild = ["gmail.com", "yahoo.com", "hotmail.com"];
        if(!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (email.split("@")[0].length < 3) {
            return res.status(400).json({ message: "Invalid email" });
            
        }
        if (!emailVaild.includes(email.split("@")[1])) {
            return res.status(400).json({ message: "Invalid email domain" });
        }
        const checkEmail = await reviewOrder.findOne({ id,email });
        if (checkEmail) {
            return res.status(400).json({ message: "Your Are Already Reviewed" });
        }
        const review = new reviewOrder({ email, comment, rating });
        await review.save();
        if (rating === 1 || rating === 2) {
            SendEmailToUser(email, "Rating Message", "we will fix problem, make it better");
        } else if (rating === 3) {
            SendEmailToUser(email, "Rating Message", "thanks, we will make it better");
        }else if (rating === 4) {
            SendEmailToUser(email, "Rating Message", "thanks, we are proud of our serives");
        }else if (rating === 5) {
            SendEmailToUser(email, "Rating Message", "thanks, we are so proud of our serives and for your support");
        }

        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};

module.exports = { reviewOrderController };