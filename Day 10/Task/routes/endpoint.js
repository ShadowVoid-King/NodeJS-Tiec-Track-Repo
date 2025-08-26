const { app } = require("../index");

// controllers routes
const {
    registerGet,
    registerPost,
} = require("../controllers/registerController");

const {
    loginGet,
    loginPost,
} = require("../controllers/loginController");

const {
    logoutGet,
} = require("../controllers/logoutController");

const {
    addStudentGet,
    addStudentPost,
    studentsGet,
} = require("../controllers/studentController");

const {
    userGET,
    deleteUserByID,
} = require("../controllers/usersController");

const { users } = require("../models/users"); // not used yet

app.get("/", (req, res) => {
    return res.render("index", { users });
})

app.get("/register", registerGet);
app.post("/register", registerPost);

app.get("/login", loginGet);
app.post("/login", loginPost);

app.get("/logout", logoutGet);

app.get("/add-student", addStudentGet);
app.post("/add-student", addStudentPost);
app.get("/students", studentsGet);

app.get("/users", userGET);
app.post("/delete-user/:id", deleteUserByID);

// 404 Page
app.get(/.*/, (req, res) => {
    return res.status(404).send("404, Page Not Found! by Me :D");
})

// app.get("/index", (req, res) => {
//     return res.render("index", { users });
// })