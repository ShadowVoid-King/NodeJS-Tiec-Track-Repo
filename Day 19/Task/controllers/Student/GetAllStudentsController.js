const { studentsData } = require("../../models/students");

const getAllStudents = (req, res) => {
	try {
		const students = studentsData.find();
		res.status(200).json(students);
	} catch (error) {
        return res.status(500).json({ message: error.message });
	}
};

module.exports = { getAllStudents };
