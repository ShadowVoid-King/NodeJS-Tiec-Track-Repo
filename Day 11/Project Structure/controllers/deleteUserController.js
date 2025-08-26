const { userData } = require("../models/users");
const { tokenData } = require("../models/token");
/* 
Check if logged in or not
1- take username, password
2- check from token if logged in
*/
const deleteUser = async (req, res) => { 
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({ message: "No users found" });
    }
    // check if user exists
    const checkToken = await tokenData.findOne({username});
    if (!checkToken) {
        return res.status(401).json({ message: "Username is required" });
    }
    if (!user) {
        return res.status(401).json({ message: "invalid username or expire token" });
    }
    const checkUser = await userData.findOne({ username });
    if (!checkUser) {
        return res.status(401).json({ message: "Invalid username" });
    }
    // not use findByIdAndDelete because he reach this point only if user found
    await userData.deleteOne({ username }); // delete user

    return res.json({ message: "User deleted successfully" });
}

module.exports = {
    deleteUser
}