const { userData } = require("../models/users");
const bcrypt = require("bcrypt");
const tokenData = require("../models/token");

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).send("All fields are required");
	}
	const getUser = await userData.findOne({username});
	if (!getUser) {
		return res.status(400).json({ message: "Invalid username or password" });
	}
	// check if password is correct by comparing it with the one in the database
	// using bcrypt

	const isPasswordValid = await bcrypt.compare(password, getUser.password);
	if (!isPasswordValid) {
		return res.status(400).json({ message: "Invalid username or password" });
	}
	// if (getUser.password !== password) {
	// 	return res.status(400).json({ message: "Invalid username or password" });
	// }

	
	// const refreshToken = require("crypto").randomBytes(32).toString("hex");
	// Save refresh token to MongoDB (will expire automatically based on TTL)
	// await Token.create({ refreshToken });
	const addToken = new tokenData({
		username
	})
	await addToken.save();
	return res.json({ message: "Login successful", refreshToken });
};

module.exports = {
	login,
};
