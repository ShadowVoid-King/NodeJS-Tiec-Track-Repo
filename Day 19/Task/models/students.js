const mongoose = require('mongoose');

const students = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    courses: {
        type: [String],
        default: []
    },
})


const studentsData = mongoose.model('students', students)
module.exports = {studentsData}