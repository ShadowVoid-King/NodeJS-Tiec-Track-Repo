const { fetchPOSTREQUEST } = require("../../utils/fetchServer");

const addNewPost = async (req, res) => {
	try {
		console.log("Request Body:", req.body);

		const { status, data } = await fetchPOSTREQUEST(
			"http://127.0.0.1:6000/posts/add-new-post",
			req.body
		);

		return res.status(status).json(data);
	} catch (error) {
		return res.status(500).json({ error: "Gateway fetch failed", details: error.message });
	}
};

module.exports = { addNewPost };
