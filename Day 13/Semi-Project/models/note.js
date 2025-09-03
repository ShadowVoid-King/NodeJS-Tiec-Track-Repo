const mongoose = require("mongoose");

const Notes = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	ownerUsername: {
		type: String,
		required: true,
	},
	categoryName: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const NotesData = mongoose.model("notes", Notes);
module.exports = { NotesData };
