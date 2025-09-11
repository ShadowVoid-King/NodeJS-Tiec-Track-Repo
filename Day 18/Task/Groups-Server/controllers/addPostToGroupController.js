const { groupsData } = require("../models/groups");
const mongoose = require("mongoose");

const addPostToGroup = async (req, res) => {
	try {
		const { groupId, postId } = req.body;
		if (!groupId || !postId) {
			return res
				.status(400)
				.json({ error: "Group ID and Post ID are required" });
		}
		if (
			!mongoose.Types.ObjectId.isValid(groupId) ||
			!mongoose.Types.ObjectId.isValid(postId)
		) {
			return res.status(400).json({ error: "Invalid Group ID or Post ID" });
		}
		const group = await groupsData.findById(groupId);
		if (!group) {
			return res.status(404).json({ error: "Group not found" });
		}
		group.posts.push(postId);
		await group.save();
		res.status(200).json(group);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = { addPostToGroup };
