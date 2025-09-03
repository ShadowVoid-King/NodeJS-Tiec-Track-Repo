const { UsersData } = require("../../models/users");
const { SessionData } = require("../../models/session");

const changeName = async (req, res) => {
    const { firstName, lastName } = req.body;
    const { token } = req.headers;
    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }
    const getSession = await SessionData.findOne({ token });
    if (!getSession) {
        return res.status(401).json({ message: "Unauthorized - Expired Session" });
    }
    const getUser = await UsersData.findOne({ username: getSession.username });
    if (!getUser) {
        return res.status(400).json({ message: "User not found" });
    }
    getUser.firstName = firstName;
    getUser.lastName = lastName;
    await getUser.save();
    return res.status(200).json({ message: "Updated successfully" });
}

module.exports = { changeName }