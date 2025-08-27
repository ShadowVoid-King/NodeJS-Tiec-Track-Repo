const { tokenData } = require("../models/token");


const logout = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send("All fields are required");
    }
	const getToken = await tokenData.findOne({ username });
	if (!getToken) {
		return res.status(400).json({ message: "Invalid token" });
	}
	await tokenData.deleteOne({ username });
	res.status(200).json({ message: "Logout successful" });
};

module.exports = { logout };