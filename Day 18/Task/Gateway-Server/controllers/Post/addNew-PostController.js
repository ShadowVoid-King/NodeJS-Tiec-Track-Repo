const {fetchPOSTREQUEST} = require("../../utils/fetchServer");

const addNewPost = async (req, res) => {
	try {
		const { username, title, description, comment } = req.body;
		if (!username || !title || !description || !comment) {
			return res.status(400).json({ message: "All inputs are required" });
		}
		const data = await fetchPOSTREQUEST(
			"http://127.0.0.1:6000/posts/add-new-post",
			{ username, title, description, comment }
		);
		return res.json({ message: data });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
module.exports = { addNewPost };
