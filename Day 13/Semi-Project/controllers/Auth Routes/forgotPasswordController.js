// Forgot Password Controller
/*
req email >

res >
{

  "message": "Password reset token sent successfully",

  "user": "object"

}
user obj will has token to use in reset password route
*/
const { UsersData } = require("../../models/users");

const forgotPassword = async(req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}
		const getUser = await UsersData.findOne({ email });
		if (!getUser) {
			return res.status(400).json({ message: "User not found" });
		}
        // Check if user Already has a password reset token
        if (getUser.passwordResetToken && getUser.passwordResetTokenExpiry > Date.now()) {
            return res.status(400).json({ message: "User already has a password reset token" });
        }
		// Create and send password reset token
		const token = crypto.randomUUID();
		getUser.passwordResetToken = token;
        getUser.passwordResetTokenExpiry = Date.now() + 300000; // 5 minutes
        await getUser.save();
		return res.status(200).json({
			message: "Password reset token sent successfully",
			user: getUser,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { forgotPassword };
