const {usersData} = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    try {
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
        const existingUser = await usersData.findOne({ $or: [ { username }, { email } ] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usersData({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {registerController}