const { get } = require('mongoose');
const { usersData } = require('../../models/users');

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
    if (!email) {
        return res.status(400).send("All fields are required");
    }
    const getUser = await usersData.findOne({ email });
    if (!getUser) {
        return res.status(400).json({ message: "Invalid email" });
    }
    // const otp = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
    getUser.otp = randomOtp;
    getUser.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await getUser.save();
    
    return res.json({ message: "OTP sent successfully", otp: randomOtp });
    } catch (error) {
        return res.json({message: error.message});
    }
};

module.exports = { sendOtp };
