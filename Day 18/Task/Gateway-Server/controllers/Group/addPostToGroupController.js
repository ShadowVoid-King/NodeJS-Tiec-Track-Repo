const { fetchPOSTREQUEST } = require("../../utils/fetchServer");

const addPostToGroup = async (req, res) => {
	try {
		const { groupId, postId } = req.body;
		if (!groupId || !postId) {
			return res.status(400).json({ message: "All inputs are required" });
		}
		const data = await fetchPOSTREQUEST(
			"http://127.0.0.1:7000/groups/add-post-to-group",
			{ groupId, postId }
		);
		return res.json({ message: data });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { addPostToGroup };