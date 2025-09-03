const { UsersData } = require("../../models/users");
const { SessionData } = require("../../models/session");
const profile = async(req, res) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        const getSession = await SessionData.findOne({ token });
        if (!getSession) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const getUser = await UsersData.findOne({ username: getSession.username });
        if (!getUser) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({
            "_id": getUser._id,
            "username": getUser.username,
            "email": getUser.email,
            "role": getUser.role,
            "firstName": getUser.firstName,
            "lastName": getUser.lastName,
            "phoneNumber": getUser.phoneNumber,
            "address": getUser.address
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { profile };
