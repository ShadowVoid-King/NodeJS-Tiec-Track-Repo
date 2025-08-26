const { app } = require("./index");
const { home } = require("./controllers/homeController");
const { profile } = require("./controllers/profileController");
const { register } = require("./controllers/registerController");
const { login } = require("./controllers/loginController");
const { users } = require("./controllers/usersController");
const {deleteUser} = require("./controllers/deleteUserController")
app.get("/", home);

app.get("/profile/:name", profile);

app.post("/register", register);

app.post("/login", login);

app.post("/users", users)

app.delete("/delete-user", deleteUser)
