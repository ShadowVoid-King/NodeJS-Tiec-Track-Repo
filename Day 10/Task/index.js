const express = require("express");

const path = require("path");

const ejs = require("ejs");

app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for HTML forms (application/x-www-form-urlencoded)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public"))); // to make default to public so when i write css/home.css it will know where to start

app.listen(3000, () => {
	// connect();
	console.log("Server is running on port 3000 .......");
});

module.exports = { app };
