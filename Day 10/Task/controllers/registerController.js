const {users} = require("../models/users");
const { saveUsers } = require("../utils");

const registerGet = (req, res) => {
	message = null;
	return res.render("register");
};
// ===========================================================
const registerPost = (req, res) => {
	const { fullName, username, email, password, role } = req.body;
	if (!username || !fullName || !email || !password || !role) {
		message = "All fields are required";
		return res.render("register", { message });
	}

	// check if username already exists
	const existingUser = users.find((u) => u.username === username);
	if (existingUser) {
		message = "Username already exists";
		return res.render("register", { message });
	}

	if (users.find((u) => u.email === email)) {
		message = "Email already exists";
		return res.render("register", { message });
	}
	//* DOESN'T MAKE A SENSE
	if (users.find((u) => u.password === password)) {
		message = "Password already exists";
		return res.render("register", { message });
	}

	// add push and save to users file
	users.push({
		id: users.length + 1,
		username,
		password,
		role,
		fullName,
        email,
        // Add "createdAt": "2024-01-01T00:00:00.000Z"
	});
	saveUsers(users, "data/users.json");
	message = "User registered successfully";
	res.render("register", { message });
	return res.redirect("login"); //! ASK login Page or Index Page ?
};

module.exports = { registerGet, registerPost };
