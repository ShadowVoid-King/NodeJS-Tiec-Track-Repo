const mongoose = require("mongoose");

const Category = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	ownerUsername: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const CategoriesData = mongoose.model("category", Category);
module.exports = { CategoriesData };