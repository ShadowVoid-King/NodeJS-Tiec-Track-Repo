const { CategoriesData } = require("../../models/categories");
const { SessionData } = require("../../models/session");
const { UsersData } = require("../../models/users");
/* 
response


{

  "_id": "string",

  "name": "string",

  "ownerUsername": "string",

  "createdAt": "date"

}

*/
const addCategories = async (req, res) => {
	const { token } = req.headers;
	if (!token) {
		return res.status(400).json({ message: "Token is required" });
	}
	const getSession = await SessionData.findOne({ token });
	if (!getSession) {
		return res.status(401).json({ message: "Unauthorized - Expired Session" });
	}
	const getUser = await UsersData.findOne({ username: getSession.username });
	if (!getUser) {
		return res.status(400).json({ message: "User not found" });
	}
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ message: "Name is required" });
	}
	// Check IF there is category with this name for this user
	const checkCategory = await CategoriesData.findOne({
		name,
		ownerUsername: getUser.username,
	});
    if (checkCategory) {
        return res.status(400).json({ message: "Category already exists" });
    }
	const categories = new CategoriesData({
		name,
		ownerUsername: getUser.username,
	});
	await categories.save();
	return res.status(201).json(categories);
};

module.exports = { addCategories };
