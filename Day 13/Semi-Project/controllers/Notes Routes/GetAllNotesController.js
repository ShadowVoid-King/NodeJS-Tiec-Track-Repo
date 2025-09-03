const { UsersData } = require("../../models/users");
const { NotesData } = require("../../models/note");
const { SessionData } = require("../../models/session");

const getAllNotes = async (req, res) => {
	const { token } = req.headers;
	if (!token) {
		return res.status(400).json({ message: "Token is required" });
	}
	const getSession = await SessionData.findOne({ token });
	if (!getSession) {
		return res.status(401).json({ message: "Unauthorized - Expired Session" });
	}
	const getUser = await UsersData.findOne({ username: getSession.username });
	if (!getUser) {
		return res.status(400).json({ message: "User not found" });
    }
    const getNotes = await NotesData.find({ ownerUsername: getUser.username });
    if (!getNotes || getNotes.length === 0) {
        return res.status(404).json({ message: "Notes not found" });
    }
    return res.status(200).json({ notes: getNotes });
};

module.exports = { getAllNotes };
