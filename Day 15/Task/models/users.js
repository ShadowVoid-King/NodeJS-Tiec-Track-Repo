const mongoose = require('mongoose');


const users = new mongoose.Schema({
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
    role : {
        type : String,
        enum : ['user', 'admin'],
        default: "user" 
    },
    otp : {
        type : Number,
        default : null
    },
    otpExpiry : {
        type : Date,
        default : null
    },
    enableOtp : {
        type : Boolean,
        default : false
    }
})


const usersData = mongoose.model('users', users)
module.exports = {usersData}