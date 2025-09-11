const { groupsData } = require('../models/groups');

const getGroupByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Group ID is required' });
        }
        const group = await groupsData.findById(id);
        res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getGroupByID };