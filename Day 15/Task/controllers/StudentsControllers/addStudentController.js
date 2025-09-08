const { studentsData } = require('../../models/students');
const bcrypt = require('bcrypt');

const AddStudent = async(req,res) => {
    try {
        const { firstName, lastName, username, age, grade, email, password } = req.body;
        if (!firstName || !lastName ||!username || !age || !grade || !email || !password ) {
            return res.status(400).json({ message: "All inputs are required" });
        }
        const checkStudent = await studentsData.findOne({ email }); // false
        if (checkStudent) {
            return res.status(400).json({ message: "Email already exists" });
        }
        hashPassword = await bcrypt.hash(password, 10);
        const addnewStudent = new studentsData({
            firstName,
            lastName,
            username,
            age,
            grade,
            email,
            password: hashPassword,
        })
        await addnewStudent.save();
        return res.status(201).json({ message: "Student added successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    
}

module.exports = { AddStudent }