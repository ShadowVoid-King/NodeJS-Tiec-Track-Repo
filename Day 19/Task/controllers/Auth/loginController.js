const { usersData } = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
	const { usernameOrEmail, password } = req.body;

	try {
		if (!usernameOrEmail || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: "Password must be at least 8 characters" });
		}
		const user = await usersData.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		});
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid username/email or password" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res
				.status(400)
				.json({ message: "Invalid username/email or password" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
        req.session.token = token;
		return res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
module.exports = { loginController };
