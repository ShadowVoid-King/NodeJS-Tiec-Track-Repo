const { fetchPOSTREQUEST } = require("../../utils/fetchServer");

const createGroup = async (req, res) => {
	try {
		const { username, title, description, post } = req.body;
		if (!username || !title || !description, post) {
			return res.status(400).json({ message: "All inputs are required" });
		}
		const data = await fetchPOSTREQUEST(
			"http://127.0.0.1:7000/groups/create-group",
			{ username, title, description, post}
		);
		return res.json({ message: data });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { createGroup };