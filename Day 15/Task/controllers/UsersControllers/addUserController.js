const { usersData } = require("../../models/users");
const bcrypt = require("bcrypt");

const AddUser = async (req, res) => {
	try {
		const { firstName, lastName, username, email, role = "user" } = req.body;
		if (!firstName || !lastName || !username || !age || !email) {
			return res.status(400).json({ message: "All inputs are required" });
		}
		const checkUser = await usersData.findOne({ email }); // false
		if (checkUser) {
			return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
		const addnewUser = new usersData({
			firstName,
			lastName,
			username,
            role,
            email,
            password: hashPassword,
		});
		await addnewUser.save();
		return res.status(201).json({ message: "User added successfully" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
module.exports = { AddUser };
