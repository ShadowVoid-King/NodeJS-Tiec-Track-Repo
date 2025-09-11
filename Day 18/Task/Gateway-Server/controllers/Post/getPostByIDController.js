const { fetchGETREQUEST } = require('../../utils/fetchServer');

const getPostByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Post ID is required' });
        }
        const data = await fetchGETREQUEST(`http://127.0.0.1:6000/posts/get-post/${id}`);
        return res.json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getPostByID };