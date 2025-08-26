const { users, loggedInUSer } = require("../models/users");
const { saveLoggedInUser } = require("../utils");

const logoutGet = (req, res) => {
    if (!loggedInUSer) {
        return message = "You are not logged in";
    }
    saveLoggedInUser({}, "data/loggedInUser.json"); // save user to file
    return res.redirect("/login");
};

module.exports = { logoutGet };