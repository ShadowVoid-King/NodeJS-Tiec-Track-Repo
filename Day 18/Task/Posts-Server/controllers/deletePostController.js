const { postsData } = require('../models/posts');

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Post ID is required' });
        }
        const deletedPost = await postsData.findByIdAndDelete(id);
        res.status(200).json(deletedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deletePost };