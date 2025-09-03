const mongoose = require("mongoose");

const Users = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	address: {
		type: String,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	passwordResetToken: {
		type: String,
		default: null,
	},
	passwordResetTokenExpiry: {
		type: Date,
		default: null,
	},
	otp: {
		type: String,
		default: null,
	},
	otpExpiry: {
		type: Date,
		default: null,
	},
	enableOtp: {
		type: Boolean,
		default: false,
	},
});

const UsersData = mongoose.model("users", Users);
module.exports = { UsersData };
