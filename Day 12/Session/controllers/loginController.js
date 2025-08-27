const { userData } = require("../models/users");
const { tokenData } = require("../models/token");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).send("All fields are required");
	}
	const getUser = await userData.findOne({ username }); // {user data from database}
	if (!getUser) {
		return res.status(400).json({ message: "Invalid username or password" });
	}
	// check if password is correct by comparing it with the one in the database
	// using bcrypt
	const match = await bcrypt.compare(password, getUser.password);
	if (!match) {
		return res.status(400).json({ message: "Invalid username or password" });
	}
	// create token with user data from database
	const addToken = new tokenData({
		username: getUser.username,
		email: getUser.email,
		role: getUser.role,
	});
	await addToken.save();
	res.status(200).json({ message: "Login successful" });
};

module.exports = {
	login
};
