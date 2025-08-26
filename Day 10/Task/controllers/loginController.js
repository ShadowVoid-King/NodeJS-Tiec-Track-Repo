const { users } = require("../models/users");
const { saveLoggedInUser } = require("../utils");
// const { message } = require("statuses");

const loginGet = (req, res) => {
    message = null;
	res.render("login");
};
// ===========================================================
const loginPost = (req, res) => {
	const { username, password } = req.body;
	const user = users.find(
		(u) => u.username === username && u.password === password
	);
	if (user) {
		saveLoggedInUser(user, "data/loggedInUser.json"); // save user to file
    } else {
        return res.render("login", { message: "Invalid username or password" });
	}
	return res.redirect("/add-student", { message: "Login successful" });
};

module.exports = { loginGet, loginPost };
