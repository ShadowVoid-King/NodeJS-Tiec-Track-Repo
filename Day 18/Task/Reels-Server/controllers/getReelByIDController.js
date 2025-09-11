const { reelsData } = require('../models/reels')
const mongoose = require('mongoose');

const getReelByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Reel ID is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Reel ID format' });
        }
        const reel = await reelsData.findById(id);
        res.status(200).json(reel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getReelByID };