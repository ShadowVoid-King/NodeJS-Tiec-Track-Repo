const express = require("express");
const { connectDB } = require("./config/connectDB.js");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

connectDB();

mongoose.connection.once("connected", () => {
	console.log("MongoDB connected..............");
	app.listen(process.env.PORT, () => console.log("Server Runing..........."));
});

// if there is an error
mongoose.connection.on("error", (err) => {
	console.log(err);
});

module.exports = { app };
