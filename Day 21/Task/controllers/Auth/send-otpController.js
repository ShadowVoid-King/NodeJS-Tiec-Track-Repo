const { usersData } = require("../../models/users");
const { otpData } = require("../../models/otp");
const SendEmailToUser = require("../../utils/mailSender");

const sendOTP = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}
	const checkUser = await usersData.findOne({ email: email });
	if (!checkUser) {
		return res.status(400).json({ message: "email not found" });
	}
	const checkOtp = await otpData.findOne({ email: email });
	if (checkOtp) {
		return res.status(400).json({ message: "Wait for 5 minutes" });
	}
	const generatedOtp = Math.floor(100000 + Math.random() * 900000);
	const addOtp = new otpData({ email: email, otp: generatedOtp.toString() });
	await addOtp.save();
	SendEmailToUser(
		email,
		"Your OTP Code",
		`Your OTP code is ${generatedOtp}. It is valid for 5 minutes.`
	);
	return res.json({ message: "OTP sent successfully" });
};

module.exports = { sendOTP };
