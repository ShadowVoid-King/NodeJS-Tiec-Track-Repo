const { UsersData } = require("../../models/users");
const bcrypt = require("bcrypt");
const { SessionData } = require("../../models/session");

const register = async (req, res) => {
	try {
		const { firstName, lastName, password, address } = req.body;
		let { role, username, email, enableOtp = false } = req.body; // role is optional + default is user + const make error because i will change it letter
		if (!username || !email || !password) {
			return res.status(400).json({
				message: "Missing required fields (username, password, email)",
			});
		}
		username = username.toLowerCase();
		email = email.toLowerCase();
		if (!role) {
			role = "user";
		}
		const checkUser = await UsersData.findOne({ username });
		if (checkUser) {
			return res.status(400).json({ message: "Username already exists" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		// it's new row in database synchronous, await UsersData.create is asynchronous so it need await
		const addUser = new UsersData({
			firstName,
			lastName,
			address,
			username,
			email,
			password: hashPassword,
			role,
			enableOtp
		});
		const uniquetoken = crypto.randomUUID();
		await addUser.save();
		const addToken = new SessionData({
			username,
			role,
			token: uniquetoken,
		});
		await addToken.save();
		return res.json({ message: "ok true", token: uniquetoken });
	} catch (error) {
		return res.json({ message: error.message });
	}
};

module.exports = { register };
