const {studentsData} = require("../../models/students")
const bcrypt = require("bcrypt");

const addStudentController = async (req, res) => {
	const { firstName, lastName, username, email, password, courses } = req.body;

    try {
        if (!firstName || !lastName || !username || !email || !password || !courses) {
            return res.status(400).json({ message: "All inputs are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        if (!Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({ message: "Courses must be a non-empty array" });
        }
		const existingStudent = await studentsData.findOne({
			$or: [{ username }, { email }],
		});
		if (existingStudent) {
			return res
				.status(400)
				.json({ message: "Username or email already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newStudent = new studentsData({
			firstName,
			lastName,
			username,
			email,
            password: hashedPassword,
            courses,
		});

		await newStudent.save();

		return res
			.status(201)
			.json({
				message: "Student added successfully",
				studentId: newStudent._id,
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
module.exports = { addStudentController };
