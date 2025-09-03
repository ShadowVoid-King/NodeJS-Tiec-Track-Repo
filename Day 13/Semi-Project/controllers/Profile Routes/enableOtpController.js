const { UsersData } = require("../../models/users");
const { SessionData } = require("../../models/session");
const enableOtp = async (req, res) => {
	try {
		const { enableOtp } = req.body;
		const { token } = req.headers;
		if (!token) {
			return res.status(400).json({ message: "Token is required" });
		}
		if (enableOtp === undefined) {
			return res.status(400).json({ message: "Missing enableOtp field" });
		}
		if (typeof enableOtp !== "boolean") {
			return res.status(400).json({ message: "enableOtp must be a boolean" });
		}
		// console.log("Received token:", token);
		const getSession = await SessionData.findOne({ token });
		// console.log("Found session:", getSession);
		if (!getSession) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const getUser = await UsersData.findOne({ username: getSession.username });
		if (!getUser) {
			return res.status(400).json({ message: "User not found" });
		}
		getUser.enableOtp = enableOtp;
		await getUser.save();
		return res.status(200).json({ message: "Updated successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = { enableOtp };
