const { SessionData } = require("../../models/session");
const { UsersData } = require("../../models/users");
const { NotesData } = require("../../models/note");
const { CategoriesData } = require("../../models/categories");

const createNote = async (req, res) => {
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

		const newNote = new NotesData({
			title: title,
			content: content,
			ownerUsername: getUser.username,
			categoryName: categoryName,
		});
		await newNote.save();
		return res.status(200).json({ message: "Note created successfully" });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { createNote };
