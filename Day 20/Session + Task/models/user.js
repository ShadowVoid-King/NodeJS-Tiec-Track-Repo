const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	name: { type: String, required: true },
	socketId: { type: String }, // to track who is online
	online: { type: Boolean, default: false },
});

const usersData = mongoose.model("User", userSchema);

module.exports = { usersData };
