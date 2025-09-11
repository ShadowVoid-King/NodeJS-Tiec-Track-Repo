const { fetchPOSTREQUEST } = require("../../utils/fetchServer");

const addNewReel = async (req, res) => {
    try {
        const { username, title, description, urlVideo } = req.body;
        if (!username || !title || !description || !urlVideo) {
            return res.status(400).json({ message: "All inputs are required" });
        }
        const data = await fetchPOSTREQUEST(
            "http://127.0.0.1:8000/reels/add-new-reel",
            { username, title, description, urlVideo }
        );
        return res.json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addNewReel };