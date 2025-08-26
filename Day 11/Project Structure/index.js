const express = require("express");

const path = require("path");

const ejs = require("ejs");

const { connect } = require("./config/connectDB.js");
const { default: mongoose } = require("mongoose");

app = express();

// Middleware
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public"))); // to make default to public so when i write css/home.css it will know where to start

connect(); // i can remove it, call it in config/connectDB.js

// block server if database is not connected
mongoose.connection.once('open', () => {
    console.log("Database connected")
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port 3000 .......");
    });
});


module.exports = {app};