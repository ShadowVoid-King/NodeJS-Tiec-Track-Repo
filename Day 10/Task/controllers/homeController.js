const { users } = require("../models/users");
const { loadLoggedInUser, loadUsers, saveUsers } = require("../utils");

loadUsers(users, "data/users.json");
const loggedInUSer = loadLoggedInUser("data/loggedInUser.json");

const studentsArr = [];
loadUsers(studentsArr, "data/students.json");

const home = (req, res) => {
	st;
	return res.render("index", { stuends: studentsArr, users });
};

module.exports = { home };