const { reelsData } = require('../models/reels')

const addNewReel = async (req, res) => {
    try {
        const { username, title, description, urlVideo } = req.body;
        if (!username || !title || !description || !urlVideo) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if ( title.length < 3 ) {
            return res.status(400).json({ error: 'Title must be at least 3 characters long' });
        }
        if (!urlVideo.startsWith('http')) {
            return res.status(400).json({ error: 'Invalid video URL' });
        }
        const newReel = new reelsData({ username, title, description, urlVideo });
        await newReel.save();
        res.status(201).json(newReel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addNewReel };