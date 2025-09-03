const { UsersData } = require("../models/users");
const { NotesData } = require("../models/note");
const { CategoriesData } = require("../models/categories");
const { SessionData } = require("../models/session");

const homePage = async (req, res) => {
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
		const getUser = await UsersData.findOne({
			username: getSession.username,
		}).select("username role -_id");
		if (!getUser) {
			return res.status(400).json({ message: "User not found" });
		}
		let categories = await CategoriesData.find({
			ownerUsername: getUser.username,
		});
		let notes = await NotesData.find({ ownerUsername: getUser.username });
		if (!notes || notes.length === 0) {
			notes = "There is no Notes";
		}
		if (!categories || categories.length === 0) {
			categories = "There is no Ccategories";
		}
		return res
			.status(200)
			.json({ currentUser: getUser, categories: categories, notes: notes });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { homePage };
