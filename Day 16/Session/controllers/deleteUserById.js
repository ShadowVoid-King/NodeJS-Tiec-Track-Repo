const { usersData } = require("../models/users");

const DeleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const deletedUser = await usersData.findByIdAndDelete(id);
    return res.json(deletedUser);
};

module.exports = { DeleteUser };