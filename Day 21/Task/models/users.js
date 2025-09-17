const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

const usersData = mongoose.model("User", userSchema);

module.exports = { usersData };
