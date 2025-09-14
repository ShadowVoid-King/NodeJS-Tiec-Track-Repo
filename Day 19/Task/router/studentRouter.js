const express = require('express')
const router = express.Router()

const { addStudentController } = require('../controllers/Student/AddStudentController')
const { getAllStudents } = require('../controllers/Student/GetAllStudentsController')
const { getStudentByID } = require('../controllers/Student/GetStudentByIDController')
const { DeleteStudent } = require('../controllers/Student/DeleteStudentController')


router.post('/add-student', addStudentController)
router.get('/all-student', getAllStudents)
router.get('/get-student/:id', getStudentByID)
router.delete('/delete-student/:id', DeleteStudent)


module.exports = router