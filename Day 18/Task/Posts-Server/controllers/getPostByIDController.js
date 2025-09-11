// Get By ID

const { postsData } = require('../models/posts')

const getPostByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Post ID is required' });
        }
        const post = await postsData.findById(id);
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getPostByID };