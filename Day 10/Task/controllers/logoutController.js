const { loggedInUSer } = require("../models/users");
const { saveLoggedInUser } = require("../utils");

const logoutGet = (req, res) => {
    if (!loggedInUSer || Object.keys(loggedInUSer).length === 0) {
        return res.send("You are not logged in");
    }
    saveLoggedInUser({}, "data/loggedInUser.json"); // save user to file
    return res.redirect("/login");
};

module.exports = { logoutGet };