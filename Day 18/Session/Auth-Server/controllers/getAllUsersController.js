const { usersData } = require('../models/users');

const getAllUsers = async (req, res) => {
    const data = await usersData.find();
    res.status(200).json(data);
}

module.exports = { getAllUsers }