const { UsersData } = require("../../models/users");
const bcrypt = require("bcrypt");

const newPassword = async (req, res) => {
	try {
		const token = req.query.passwordResetToken;
		if (!token) {
			return res.status(400).json({ message: "Password reset token required" });
		}
		const getUser = await UsersData.findOne({ passwordResetToken: token });
		if (!getUser) {
			return res.status(400).json({ message: "User not found" });
		}
		// Check if password reset token has expired for 5 minutes
		if (getUser.passwordResetTokenExpiry < Date.now()) {
			return res.status(400).json({ message: "Password reset token expired" });
		}
		const { newPassword, confirmPassword } = req.body;
		if (!newPassword || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}
		const hashPassword = await bcrypt.hash(newPassword, 10);
		// it's better than use UpdateOne because it's faster and secure
		getUser.password = hashPassword;
		getUser.passwordResetToken = null;
		getUser.passwordResetTokenExpiry = null;
		await getUser.save();
		return res
			.status(200)
			.json({ message: "Password updated successfully", updatedUser: getUser });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { newPassword };
