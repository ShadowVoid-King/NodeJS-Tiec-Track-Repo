const { CategoriesData } = require("../../models/categories");
const { SessionData } = require("../../models/session");
const { UsersData } = require("../../models/users");

const getCategories = async (req, res) => {
	try {
		const { token } = req.headers;

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const getSession = await SessionData.findOne({ token });
		if (!getSession) {
			return res
				.status(401)
				.json({ message: "Unauthorized - Expired Session" });
		}

		const getUser = await UsersData.findOne({ username: getSession.username });
		if (!getUser) {
			return res
				.status(400)
				.json({ message: "There is No Categories for Current User" });
		}

		// Catch categories only for this user
		const categories = await CategoriesData.find({
			ownerUsername: getUser.username,
		});
		// !Null || categ.Length = 0
		if (!categories || categories.length === 0) {
			return res
				.status(404)
				.json({ message: "No categories found for current user" });
		}
		return res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { getCategories };
