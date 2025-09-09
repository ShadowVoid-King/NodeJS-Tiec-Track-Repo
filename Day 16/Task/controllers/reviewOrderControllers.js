const { reviewData } = require("../models/reviews");
const { orderData } = require("../models/order");
const { SendEmailToUser } = require("../utils/mailSender");
const mongoose = require("mongoose");

const reviewOrderController = async (req, res) => {
	try {
		const orderId = req.params.id || req.body.orderId;

		if (!orderId) {
			return res.status(400).json({ message: "Order ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }
		const checkOrder = await orderData.findOne({
			_id: orderId
		});
		if (!checkOrder) {
			return res.status(404).json({ message: "Order not found" });
		}
		const { email, comment, rating } = req.body;

		if (!email.toLowerCase().trim() || !comment || !rating) {
			return res.status(400).json({ message: "All fields are required" });
		}
		// Turn rating to number
		const numberRating = Number(rating);
		// Turn email to cleaned
		const cleanEmail = email.toLowerCase().trim();
		if (typeof numberRating !== "number") {
			return res.status(400).json({ message: "Rating must be a number" });
		}
		if (isNaN(numberRating)) {
			return res.status(400).json({ message: "Rating must be a number" });
		}
		if (typeof comment !== "string") {
			return res.status(400).json({ message: "Comment must be a string" });
		}
		if (typeof cleanEmail !== "string") {
			return res.status(400).json({ message: "Email must be a string" });
		}
		if (numberRating < 1 || numberRating > 5) {
			return res
				.status(400)
				.json({ message: "Rating must be between 1 and 5" });
		}
		const emailVaild = ["gmail.com", "yahoo.com", "hotmail.com"];
		if (!cleanEmail.includes("@")) {
			return res.status(400).json({ message: "Invalid email" });
		}
		if (cleanEmail.split("@")[0].length < 3) {
			return res.status(400).json({ message: "Invalid email" });
		}
		if (!emailVaild.includes(cleanEmail.split("@")[1])) {
			return res.status(400).json({ message: "Invalid email domain" });
		}
		const checkEmail = await reviewData.findOne({ orderId: orderId, email: cleanEmail });
		if (checkEmail) {
			return res.status(400).json({ message: "You have already reviewed this order" });
		}
		const review = new reviewData({
			orderId: checkOrder._id,
			email: cleanEmail,
			comment,
			rating: numberRating,
		});

		await review.save();

		if (numberRating === 1 || numberRating === 2) {
			SendEmailToUser(
				cleanEmail,
				"Rating Message",
				"we will fix problem, make it better"
			);
		} else if (numberRating === 3) {
			SendEmailToUser(
				cleanEmail,
				"Rating Message",
				"thanks, we will make it better"
			);
		} else if (numberRating === 4) {
			SendEmailToUser(
				cleanEmail,
				"Rating Message",
				"thanks, we are proud of our services"
			);
		} else if (numberRating === 5) {
			SendEmailToUser(
				cleanEmail,
				"Rating Message",
				"thanks, we are so proud of our serives and for your support"
			);
		}

		res.status(201).json({ message: "Review added successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error adding review", error: error.message });
	}
};

module.exports = { reviewOrderController };
