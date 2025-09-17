const { usersData } = require('../../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginGet = (req, res) => {
	try {
		res.render("Auth/index.ejs");
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const loginPost = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "Username and password are required" });
		}
		const checkUser = await usersData.findOne({ username: username });
		if (!checkUser) {
			return res.status(400).json({ message: "User not found" });
		}
		const isPasswordValid = await bcrypt.compare(password, checkUser.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid password" });
		}
		const token = jwt.sign(
			{
				firstName: checkUser.firstName,
				lastName: checkUser.lastName,
				email: checkUser.email,
				role: checkUser.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "5m" }
		);
		req.session.token = token;
		return res.json({ message: "login done" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { loginGet, loginPost}