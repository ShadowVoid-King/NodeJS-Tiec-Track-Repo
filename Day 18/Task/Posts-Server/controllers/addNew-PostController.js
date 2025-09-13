const { postsData } = require('../models/posts');
const jwt = require('jsonwebtoken');

const addNewPost = async (req, res) => {
    try {
        const { username, title, description, comment } = req.body;
        if (!username || !title || !description || !comment) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Check If He is same user of logged account
        // const checkUser = jwt.verify(req.session.token, process.env.JWT_SECRET)
        // if (checkUser.username !== username) {
        //     return res.status(400).json({ error: 'Unauthorized' });
        // }

        const newPost = new postsData({
            username,
            title,
            description,
            comment,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addNewPost };