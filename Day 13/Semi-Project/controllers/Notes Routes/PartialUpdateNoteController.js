const { UsersData } = require("../../models/users");
const { NotesData } = require("../../models/note");
const { SessionData } = require("../../models/session");
const { CategoriesData } = require("../../models/categories");
const mongoose = require("mongoose");

const partialUpdateNote = async (req, res) => {
	try {
		const { token } = req.headers;
		if (!token) {
			return res.status(400).json({ message: "Token is required" });
		}
		const getSession = await SessionData.findOne({ token });
		if (!getSession) {
			return res
				.status(401)
				.json({ message: "Unauthorized - Expired Session" });
		}
		const getUser = await UsersData.findOne({ username: getSession.username });
		if (!getUser) {
			return res.status(400).json({ message: "User not found" });
		}
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid note ID" });
		}
		const { title, content } = req.body;
		let { categoryName } = req.body;
		const updates = {};
		if (title !== undefined) updates.title = title;
		if (content !== undefined) updates.content = content;
		// Null or undefined
		if (categoryName !== undefined) {
			if (!categoryName?.trim()) {
				updates.categoryName = "Uncategorized";
			} else {
				// Only validate if categoryName is not blank
				const checkCategory = await CategoriesData.findOne({
					name: categoryName,
					ownerUsername: getUser.username,
				});
				if (!checkCategory) {
					return res
						.status(400)
						.json({ message: "Unknown category for this user" });
				}
				updates.categoryName = categoryName; // set the valid category
			}
		}
		const updatedNote = await NotesData.findOneAndUpdate(
			{ _id: id, ownerUsername: getUser.username },
			// $set is the safe way to update just specific fields
			{ $set: updates },
			// to return the updated document + validation rules
			{ new: true, runValidators: true }
		);
		if (!updatedNote) {
			return res.status(404).json({ message: "Note not found" });
		}
		return res.status(200).json({ note: updatedNote });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { partialUpdateNote };
