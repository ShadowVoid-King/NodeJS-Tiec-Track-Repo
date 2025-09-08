const { usersData } = require("../../models/users");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const checkUser = await usersData.findById(id); // {}
    if (!checkUser) {
        return res.status(404).json({ message: "User not found" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    
    checkUser.firstName = firstName;
    checkUser.lastName = lastName;
    checkUser.email = email;
    checkUser.password = hashPassword;
    await checkUser.save();
    return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { updateUser };