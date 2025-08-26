const { userData } = require("../models/users");
const { tokenData } = require("../models/token");

const { users } = async(req, res) => {
    const getUser = await userData.find(); // back all users

    const username = req.body.username;
    if (!username) {
        return res.status(404).json({ message: "No users found" });
    }
const checkToken = await tokenData.findOne({username});
    if (!checkToken) {
        return res.status(401).json({ message: "No users found" });
    }

    return res.json(getUser);
}

module.exports = { users };