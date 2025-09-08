const { usersData } = require("../../models/users");


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await usersData.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getUserById };