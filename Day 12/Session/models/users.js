const mongoose = require("mongoose");

const users = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true // to make sure that the username is unique but it can make server get error and stop working so use try catch
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const userData = mongoose.model("User", users);

module.exports = { userData };