const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
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
	age: {
		type: Number,
		required: true,
	},
	grade: {
		type: String,
		required: true,
	},
});

const studentsData = mongoose.model("students", studentsSchema);
module.exports = { studentsData };
