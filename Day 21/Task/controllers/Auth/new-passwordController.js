const { usersData } = require("../../models/users");
const { otpData } = require("../../models/otp");
const bcrypt = require("bcrypt");

const newPasswordGet = (req, res) => {
	try {
		res.render("Auth/newPassword.ejs");
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const newPasswordPost = async (req, res) => {
	try {
		const { email, otp, newPassword, confirmPassword } = req.body;
		if (!email || !otp || !newPassword || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const checkEmail = await otpData.findOne({ email: email });
		if (!checkEmail) {
			return res
				.status(400)
				.json({ message: "Email not found or OTP expired" });
		}
		if (checkEmail.otp !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}
		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}
		const hashPassword = await bcrypt.hash(newPassword, 10);
		await usersData.updateOne({ email: email }, { password: hashPassword });
		await otpData.deleteOne({ email: email });
		return res.json({ message: "Password updated successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { newPasswordGet, newPasswordPost };
