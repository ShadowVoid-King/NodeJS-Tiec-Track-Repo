const express = require('express');
const { GetAllStudents } = require('../controllers/StudentsControllers/getAllStudentsController');
const { AddStudent } = require('../controllers/StudentsControllers/addStudentController');
const { GetStudentById } = require('../controllers/StudentsControllers/getStudentByIdController');
const { UpdateStudent } = require('../controllers/StudentsControllers/updateStudentController');
const { DeleteStudent } = require('../controllers/StudentsControllers/deleteStudentController');

const router = express.Router();

router.get('/all-student', GetAllStudents);
router.post('/add-student', AddStudent);
router.get('/getStudent/:id', GetStudentById);
router.put('/edit-student/:id', UpdateStudent);
router.delete('/delete/:id', DeleteStudent);

module.exports = router