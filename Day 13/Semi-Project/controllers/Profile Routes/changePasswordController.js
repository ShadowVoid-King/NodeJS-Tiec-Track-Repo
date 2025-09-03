const { UsersData } = require("../../models/users");
const { SessionData } = require("../../models/session");
const bcrypt = require("bcrypt");

const changePassword = async(req, res) => {
	try {
		const { token } = req.headers;
		if (!token) {
			return res.status(401).json({ message: "Token is required" });
		}
		const { oldPassword, newPassword, confirmPassword } = req.body;
		if (!oldPassword || !newPassword || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}
		const getSession = await SessionData.findOne({ token });
		if (!getSession) {
			return res.status(401).json({ message: "Unauthorized - Expired Session" });
		}
		const getUser = await UsersData.findOne({ username: getSession.username });
		if (!getUser) {
			return res.status(400).json({ message: "User not found" });
		}
		const match = await bcrypt.compare(oldPassword, getUser.password);
		if (!match) {
			return res.status(400).json({ message: "Old password is incorrect" });
		}
		const hashPassword = bcrypt.hashSync(newPassword, 10);
		getUser.password = hashPassword;
        await getUser.save();
        // Terminate Old Session for security 
        await SessionData.findOneAndDelete({ username: getSession.username });
		return res.status(200).json({ message: "Updated successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { changePassword };
