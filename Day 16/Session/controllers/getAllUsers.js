const { usersData } = require("../models/users");

const getAllUsers = async (req, res) => {
    const allUsers = await usersData.find();
    return res.json(allUsers);
};

module.exports = { getAllUsers };