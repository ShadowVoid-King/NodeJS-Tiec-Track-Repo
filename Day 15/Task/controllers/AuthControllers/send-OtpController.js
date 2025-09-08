const { usersData } = require('../../models/users');

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
    if (!email) {
        return res.status(400).send("All fields are required");
    }
    const getUser = await users.findOne({ email });
    if (!getUser) {
        return res.status(400).json({ message: "Invalid email" });
    }
    // const otp = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
    const addOtp = await usersData.create({ email, otp: randomOtp });
    await addOtp.save();
    return res.json({ message: "OTP sent successfully", otp: randomOtp });
    } catch (error) {
        return res.json({message: error.message});
    }
};

module.exports = { sendOtp };
