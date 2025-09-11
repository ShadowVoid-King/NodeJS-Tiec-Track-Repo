const { fetchGETREQUEST } = require('../../utils/fetchServer');

const getAllReels = async (req, res) => {
    try {
        const data = await fetchGETREQUEST('http://127.0.0.1:8000/reels/get-all-reels');
        return res.json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllReels };