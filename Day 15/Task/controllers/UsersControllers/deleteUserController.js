const { usersData } = require("../../models/users");


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await usersData.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await usersData.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { deleteUser };