const { CategoriesData } = require("../../models/categories");
const { SessionData } = require("../../models/session");
const { UsersData } = require("../../models/users");
const { NotesData } = require("../../models/note");

//! Don't Forget Check If Category Has Notes
const deleteCategories = async(req, res) => {
	try {
		const id = req.params.id;
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
		const getCategories = await CategoriesData.findOne({
			_id: id,
			ownerUsername: getUser.username,
		});
		if (!getCategories) {
			return res.status(404).json({ message: "Category not found" });
		}
		//? Check If Category Has Notes
		const getNotes = await NotesData.findOne({ categoryName: getCategories.name });
		if (getNotes) {
			return res.status(400).json({ message: "Category has notes" });
		}
		await CategoriesData.deleteOne({ _id: id, ownerUsername: getUser.username });
		return res.status(200).json({ message: "Deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { deleteCategories };
