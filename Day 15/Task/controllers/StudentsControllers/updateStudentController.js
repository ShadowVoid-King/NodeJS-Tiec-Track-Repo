const { studentsData } = require("../../models/students");
const bcrypt = require('bcrypt');

const UpdateStudent = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "Student ID is required" });
		}
        const { firstName, lastName, username, age, grade, email, password } = req.body;
        if (!firstName || !lastName || !username || !age || !grade || !email || !password) {
            return res.status(400).json({ message: "All inputs are required" });
        }
		const student = await studentsData.findById(id);
		if (!student) {
			return res.status(404).json({ message: "Student not found" });
        }
        hashPassword = await bcrypt.hash(password, 10);

		student.firstName = firstName;
		student.lastName = lastName;
		student.username = username;
		student.age = age;
		student.grade = grade;
        student.email = email;
        student.password = hashPassword;
		await student.save();
		return res.status(200).json({ message: "Student updated successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { UpdateStudent };
