const { usersData } = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerGet = (req, res) => {
	res.render("Auth/register");
};

const registerPost = async (req, res) => {
	try {
		console.log("Incoming register request:", req.body); // 👈 log request

		const { firstName, lastName, username, email, password, role } = req.body;
		if (!firstName || !lastName || !username || !email || !password || !role) {
			return res.status(400).json({ message: "All inputs are required" });
		}

		const checkUser = await usersData.findOne({ username: username });
		if (checkUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new usersData({
			firstName,
			lastName,
			username,
			email,
			password: hashedPassword,
			role,
		});
		await newUser.save();

		console.log("✅ User registered:", newUser.username);

		const token = jwt.sign(
			{ firstName, lastName, email, role },
			process.env.JWT_SECRET,
			{ expiresIn: "5m" }
		);
		req.session.token = token;

		return res.json({ message: "User registered successfully" });
	} catch (error) {
		console.log("❌ Error in registerPost:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { registerGet, registerPost };
