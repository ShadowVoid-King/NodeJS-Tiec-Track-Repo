const { studentsData } = require("../../models/students");


const DeleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Student ID is required" });
        }
        const student = await studentsData.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        await studentsData.findByIdAndDelete(id);
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { DeleteStudent };