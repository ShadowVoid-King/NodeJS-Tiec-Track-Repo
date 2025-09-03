const { UsersData } = require("../../models/users");
const { SessionData } = require("../../models/session");
const bcrypt = require("bcrypt");

// ~loginStart
const loginStart = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "Username and Password required" });
		}
		const getUser = await UsersData.findOne({ username });
		if (!getUser) {
			return res.status(400).json({ message: "Missing username or password" });
		}
		if (getUser.username !== username) {
			return res.status(400).json({ message: "Missing username" });
		}
		const match = await bcrypt.compare(password, getUser.password);
		if (!match) {
			return res.status(400).json({ message: "Wrong password" });
		}
		//^ No Otp ==> Login
		if (getUser.enableOtp == false) {
			const alreadyHaveSession = await SessionData.findOne({
				username: getUser.username, // username is Unique
			});
			if (alreadyHaveSession?.token) {
				return res
					.status(400)
					.json({ message: "Already Logged In, Please Wait 5m" });
			}
			const uniquetoken = crypto.randomUUID();
			const addToken = new SessionData({
				username: getUser.username,
				token: uniquetoken,
				role: getUser.role,
			});
			await addToken.save();
			return res.json({ message: "Login successful", user: getUser, session: addToken });
		} else {
			//^ True enableOTP
			const alreadyHaveToken = await UsersData.findOne({
				username: getUser.username, // username is Unique
			});
			//* alreadyHaveToken?.otpExpiry mean if alreadyHaveToken has otpExpiry and otpExpiry is not null
			if (alreadyHaveToken?.otpExpiry && Date.now() < alreadyHaveTokenotpExpiry.getTime() + 300000
			) {
				return res
					.status(400)
					.json({ message: "Already Logged In, Please Wait 5m" });
			}
			const randomSix = "" + Math.floor(100000 + Math.random() * 900000);
			// 6 num OTP, it first digit will not include zero
			const updatedUser = await UsersData.findOneAndUpdate(
				{ username },
				{
					otp: randomSix,
					otpExpiry: Date.now(),
				},
				{ new: true } // return updated document
			);
			// Fix Send Old Otp
			// 1- { new: true } // return updated document
			// 2- refetch by getUser Again
			// 3- use Mutate getUser and save
			return res.json({ message: "OTP sent successfully", user: updatedUser });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
};
//~ loginVerify
const loginVerify = async (req, res) => {
	try {
		const { username, otpCode } = req.body;
		if (!username || !otpCode) {
			return res.status(400).json({ message: "Missing username or OTP code" });
		}
		const getUser = await UsersData.findOne({ username });
		if (!getUser) {
			return res
				.status(400)
				.json({ message: "This Username Doesn't have account" });
		}
		if (getUser.enableOtp == true) {
			if (!getUser.otp) {
				// !Null = true
				return res.status(401).json({ message: "No active OTP" });
			}
			// OTP Code will expire after 5m, so he can try again after 5m
			if (
				getUser.otp !== otpCode &&
				getUser.otpExpiry.getTime() + 300000 > Date.now()
			) {
				return res.status(401).json({ message: "Invalid or expired OTP" });
			}
			const getSession = await SessionData.findOne({ username });
			if (getSession) {
				await SessionData.findOneAndDelete({ username });
			}
			const uniquetoken = crypto.randomUUID();
			const addToken = new SessionData({
				username,
				role: getUser.role,
				token: uniquetoken,
			});
			await addToken.save();
			const filterSession = {
				username: addToken.username,
				token: addToken.token,
				role: addToken.role,
			};
			//* Reset OTP
			getUser.otp = null;
			getUser.otpExpiry = null;
			await getUser.save();
			return res.json({
				message: "Login successful",
				user: getUser,
				session: filterSession,
			});
		} else {
			//^ False enableOtp
			return res.json({ message: "Login successful", user: getUser });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { loginStart, loginVerify };
