const { usersData } = require("../../models/users");
const bcrypt = require("bcrypt");

const forgetPassword = async (req, res) => {
	const { email, otp, newPassword, confirmPassword } = req.body;
	if (!email || !otp || !newPassword || !confirmPassword) {
		return res.status(400).json({ message: "All fields are required" });
	}
	const checkEmail = await usersData.findOne({ email }); // {}
	if (!checkEmail) {
        return res.status(400).json({ message: "Email not found Or Expired OTP" });
	}
	if (checkEmail.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
	}
	if (checkEmail.otpExpiry < Date.now()) {
		return res.status(400).json({ message: "OTP has expired" });
	}
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
	await usersData.updateOne({ email }, { password: hashPassword }); // update password
	checkEmail.otp = null;
	checkEmail.otpExpiry = null;
	await checkEmail.save();
	return res.json({ message: "Password changed successfully" });
};
module.exports = { forgetPassword };
