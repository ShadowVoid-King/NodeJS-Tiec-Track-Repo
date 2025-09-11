const { reelsData } = require('../models/reels')

const getAllReels = async (req, res) => {
    try {
        const reels = await reelsData.find();
        res.status(200).json(reels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllReels };