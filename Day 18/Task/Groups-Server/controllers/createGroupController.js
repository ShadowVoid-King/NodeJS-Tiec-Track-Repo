const { groupsData } = require("../models/groups");
const mongoose = require("mongoose");

const createGroup = async (req, res) => {
	try {
		const { username, title, description, post } = req.body;
		if (!username || !title || !description || !post) {
			return res.status(400).json({ error: "All fields are required" });
		}
		// // Check If He is same user of logged account
		// const checkUser = jwt.verify(req.session.token, process.env.JWT_SECRET);
		// if (checkUser.username !== username) {
		// 	return res.status(400).json({ error: "Unauthorized" });
        // }
        if (post.length > 0) {
            return res.status(400).json({ error: "Cannot create group with Empty post" });
        }
        if ( mongoose.Types.ObjectId.isValid(post) ) {
            return res.status(400).json({ error: "Post ID is not valid" });
        }
        // Create Group
		const newGroup = new groupsData({
			username,
			title,
            description,
            posts
		});
		await newGroup.save();
		res.status(201).json(newGroup);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = { createGroup };
