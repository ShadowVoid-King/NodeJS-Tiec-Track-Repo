const { userData } = require("../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	const { firstName, lastName, username, email, password, role } = req.body;
	if (!firstName || !lastName || !username || !email || !password) {
		return res.status(400).send("All fields are required");
	}
	// userData.findOne({ username }).then((user) => {
	//     if (user) {
	//         return res.status(400).json({ message: "Username already exists" });
	//     }
	//     bcrypt.hash(password, 10, (err, hash) => {
	//         if (err) {
	//             return res.status(500).json({ message: "Error hashing password" });
	//         }
	//         userData.create({
	//             firstName,
	//             lastName,
	//             username,
	//             email,
	//             password: hash,
	//         })
	//             .then((user) => {
	//                 res.status(200).json({ message: "Registration successful" });
	//             })
	//             .catch((error) => {
	//                 res.status(500).json({ message: "Error registering user" });
	//             });
	//     });
	// });
	if (!role) {
		role = "user";
	}
	const checkerUser = await userData.findOne({ username }, { email });
	if (checkerUser) {
		return res.status(400).json({ message: "User already exists" });
	}
	if (password.legth < 8) {
		return res
			.status(400)
			.json({ message: "Password must be at least 8 characters" });
	}
	const hashPassword = await bcrypt.hash(password, 10); // it's async so we need to await
	const addNewUser = new userData({
		// keys should be the same as the schema
		firstName,
		lastName,
		username,
		email,
		password: hashPassword,
		role,
	});
	await addNewUser.save(); // to save the data to the database
	const addToken = new tokenData({
		username,
		email,
		role
	});
	await addToken.save();
	res.status(200).json({ message: "Login successful" });
};

module.exports = { register };
