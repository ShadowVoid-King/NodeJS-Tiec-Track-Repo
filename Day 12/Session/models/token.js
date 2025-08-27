const mongoose = require("mongoose");

const token = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 60, // 1 hour
	},
});

const tokenData = mongoose.model("Token", token);

module.exports = { tokenData };
