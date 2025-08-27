const { otpData } = require("../models/otp"); // back otp from schema
const { userData } = require("../models/users");
const bcrypt = require("bcrypt");

const newPassword = async (req, res) => {
	const { email, otp, newPassword, confirmPassword } = req.body;
	if (!email || !otp || !newPassword || !confirmPassword) {
		return res.status(400).json({ message: "All fields are required" });
	}
	const checkEmail = await otpData.findOne({ email }); // {}
	if (!checkEmail) {
        return res.status(400).json({ message: "Email not found Or Expired OTP" });
	}
	if (checkEmail.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
	}
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
	await userData.updateOne({ email }, { password: hashPassword }); // update password
	await otpData.deleteOne({ email }); // delete otp from database
	return res.json({ message: "Password changed successfully" });
};
module.exports = { newPassword };
