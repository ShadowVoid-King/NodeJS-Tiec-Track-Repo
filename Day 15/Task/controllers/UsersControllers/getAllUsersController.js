const { usersData } = require("../../models/users");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await usersData.find();
        return res.status(200).json({ users: allUsers });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllUsers };