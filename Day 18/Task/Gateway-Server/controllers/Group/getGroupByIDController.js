const { fetchGETREQUEST } = require('../../utils/fetchServer');

const getGroupByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Group ID is required' });
        }
        const data = await fetchGETREQUEST(`http://127.0.0.1:7000/groups/get-group/${id}`);
        return res.json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getGroupByID;