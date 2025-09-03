const {UsersData} = require("../../models/users");
const {NotesData} = require("../../models/note");
const { SessionData } = require("../../models/session");
const mongoose = require("mongoose");
const deleteNote =async (req, res) => {
	try {
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
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid note ID" });
	}
	const getNote = await NotesData.findOne({ _id: id, ownerUsername: getUser.username });
	if (!getNote) {
		return res.status(404).json({ message: "Note not found" });
	}
	await NotesData.deleteOne({ _id: id });
	return res.status(200).json({ ok: true });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}
module.exports = {deleteNote};