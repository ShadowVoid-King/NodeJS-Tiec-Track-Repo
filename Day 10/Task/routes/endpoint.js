const { app } = require("../index");

// controllers routes

const { home } = require("../controllers/homeController");

const {
	registerGet,
	registerPost,
} = require("../controllers/registerController");

const { loginGet, loginPost } = require("../controllers/loginController");

const { logoutGet } = require("../controllers/logoutController");

const {
	addStudentGet,
	addStudentPost,
	studentsGet,
	studentEditGet,
	studentEditPost,
	studentDeletePost,
} = require("../controllers/studentController");

const { userGET, deleteUserByID } = require("../controllers/usersController");

const { users } = require("../models/users"); // not used yet

app.get("/", home);

app.get("/register", registerGet);
app.post("/register", registerPost);

app.get("/login", loginGet);
app.post("/login", loginPost);

app.get("/logout", logoutGet);

app.get("/add-student", addStudentGet);
app.post("/add-student", addStudentPost);
app.get("/students", studentsGet);

app.get("/edit-student/:id", studentEditGet);
app.post("/edit-student/:id", studentEditPost);
app.post("/delete-student/:id", studentDeletePost);

app.get("/users", userGET);
app.post("/delete-user/:id", deleteUserByID);

// 404 Page
app.get(/.*/, (req, res) => {
    message = "Page Not Found";
	return res.render("error", { message });
});

// app.get("/index", (req, res) => {
//     return res.render("index", { users });
// })
