const { studentsData } = require('../../models/students');

const GetAllStudents = async (req, res) => {
    try {
        const students = await studentsData.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
module.exports = { GetAllStudents };