const first = require("ee-first");
const mongoose = require("mongoose");
const users = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
        },
        age: {
            type: Number,
            required: true,
        },
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
); // to add createdAt and updatedAt

const userData = mongoose.model("users", users);
module.exports = { userData };
