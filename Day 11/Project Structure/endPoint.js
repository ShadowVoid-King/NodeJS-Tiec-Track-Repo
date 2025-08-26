const { app } = require("./index");
const { home } = require("./controllers/homeController");
const { profile } = require("./controllers/profileController")
const { register } = require("./controllers/registerController")

app.get("/", home);

app.get("/profile/:name", profile);

app.post('/register', register)


// 