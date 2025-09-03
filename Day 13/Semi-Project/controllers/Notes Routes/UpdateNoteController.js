const { UsersData } = require("../../models/users");
const { NotesData } = require("../../models/note");
const { SessionData } = require("../../models/session");
const { CategoriesData } = require("../../models/categories");
const mongoose = require("mongoose");

const updateNote = async (req, res) => {
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
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: "Title and content are required" });
		}
		// Null or undefined
		if (!categoryName?.trim()) {
			categoryName = "Uncategorized";
		} else {
			// 400 Unknown category for this user
			const checkCategory = await CategoriesData.findOne({
				name: categoryName,
				ownerUsername: getUser.username,
			});
			if (!checkCategory) {
				return res
					.status(400)
					.json({ message: "Unknown category for this user" });
			}
		}
		const updatedNote = await NotesData.findOneAndUpdate(
			{ _id: id, ownerUsername: getUser.username },
			{ title, content, categoryName },
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

module.exports = { updateNote };
