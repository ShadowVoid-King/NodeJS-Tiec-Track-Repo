// Express Server Entry Point
const express = require("express");
const app = express();
const PORT = 6060;

const {
    loadTasks,
    loadUsers,
    saveTasks,
    saveUsers,
    loadLoggedInUser,
    saveLoggedInUser,
} = require("./utils.js");

// Local Database
const tasks = [];
const users = [];

loadTasks(tasks, "data/tasks.json");
loadUsers(users, "data/users.json");
const loggedInUSer = loadLoggedInUser(users, "data/loggedInUser.json"); //* work as session

// Middleware
app.use(express.json());

// Routes
//~ Done
app.get("/api/tasks", (req, res) => {
    // should get all tasks from tasks array
    return res.json(tasks);
});
//~ Done
app.get("/api/tasks/search", (req, res) => {
    // query string should contain keyword and we should search in tasks array using this keyword
    // If the keyword exists on title or description we should respond with this task
    const keyword = req.query.keyword; // search by ?keyword=
    for (let i = 0; i < tasks.length; i++) {
        // or use OF Array
        const task = tasks[i];
        if (task.title.includes(keyword) || task.description.includes(keyword)) {
            return res.json(task); // it will back if successed test
        }
    }
});

//!!! YOU MUST BE LOGGED IN TO DO IT
// ~ DONE
app.post("/api/tasks", (req, res) => {
    // body should contain these info title, description
    // priority(high, low, medium) + the username who created the task
    const task = {
        title: req.body.title, // GET TITLE VALUE FROM request body,
        description: req.body.description, // GET DESCRIPTION VALUE FROM request body,
        priority: req.body.priority, // GET PRIORTY VALUE FROM request body,
        username: loggedInUSer.username, // GET USERNAME FROM THE USER CURRENTLY LOGGED IN
    };
    // Add Check if user logged in or not from data/loggedinUser.Json
    if (!loggedInUSer) {
        return res.status(401).send("401, Unauthorized");
    }
    if (!task.title || !task.description || !task.priority || !task.username) {
        // if there is no Data Come it Error Message
        return res.status(400).send("Missing required fields");
    }
    if (!["high", "medium", "low"].includes(task.priority)) {
        return res.status(400).send("Invalid priority value");
    }
    tasks.push(task);

    // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
    saveTasks(tasks, "data/tasks.json");
    res.status(201).send("Done Create Task");
});

// ~ DONE
// YOU MUST BE LOGGED IN TO DO IT OR YOU ARE THE CREATOR OF THE TASK
app.delete("/api/tasks/", (req, res) => {
    // request should contain id of task to delete
    // who can delete task will be user of task or admin role
    // user should authenizcated to see his tasks
    const getTitle = req.query.title; // it will back all task for Username

    const task = tasks.find((t) => t.title === getTitle); // find task by title

    if (!loggedInUSer) {
        return res.status(401).send("401, Unauthorized");
    }
    if (!task) {
        // check if task exist
        return res.status(404).send("Task not found");
    }
    if (
        !(loggedInUSer.role == "ADMIN" || loggedInUSer.username == task.username)
    ) {
        // Admin Role ( it can be any one) || logged user it can be me :D
        return res.status(403).send("Forbidden");
    }
    const index = tasks.indexOf(task); // back task index
    tasks.splice(index, 1); // splice update array data
    // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
    saveTasks(tasks, "data/tasks.json");
    return res.status(200).send("Task deleted successfully"); // POWER
});

// ~ DONE
app.get("/profile", (req, res) => {
    // we get query string from req and search user in users array
    const username = req.query.username;
    const user = users.find((u) => u.username === username);
    if (user) {
        return res.json({
            username: user.username,
            email: user.email,
            role: user.role,
        }); // it will break if not
    }
    return res.status(404).send("User not found");
});

// YOU MUST BE LOGGED IN AND HAVE ADMIN ROLE TO DO IT
app.delete("/profile", (req, res) => {
    // we get query string from req and search user in users array then delete this user
    // Who Can Delete is Profile is Admin Role OR User of account
    // Check By Username to His Role
    const username = req.query.username;
    const user = users.find((u) => u.username === username);

    if (!loggedInUSer) {
        return res.status(401).send("401, Unauthorized");
    }
    if (!(loggedInUSer.role == "ADMIN" || loggedInUSer.username == username)) {
        // Admin Role ( it can be any one) || logged user it can be me :D
        return res.status(403).send("Forbidden");
    }
    if (!user) {
        // check if he is exist
        return res.status(404).send("User not found");
    }
    const index = users.indexOf(user); // back user index
    users.splice(index, 1); // splice update array data
    saveUsers(users, "data/users.json");
    return res.status(200).send("User deleted successfully"); // POWER
});

//~ Done
app.post("/register", (req, res) => {
    // body should contain these info username, email, password, role (ADMIN or USER)
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).send("Missing required fields");
    }
    if (users.find((u) => u.username === username)) {
        return res.status(409).send("Username already exists");
    }
    users.push({ username, email, password, role });
    res.status(201).send("User registered successfully");

    // KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
    saveUsers(users, "data/users.json");
});

//~ Done
app.post("/login", (req, res) => {
    // body should contain these info username or email, password
    // After logging user data will be saved into a file named "data/loggedInUser.json"
    // And we will use this file to check authentication for users in specifiec routes

    const user = users.find(
        (user) =>
            user.username === req.body.username || user.email === req.body.email
    );
    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }
    if (user.password !== req.body.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    saveLoggedInUser(user);
    return res.status(200).send("Okey Login");
});

// Logout Route
app.post("/logout", (req, res) => {
    if (!loggedInUSer) {
        return res.status(401).send("401, User Not Logged In");
    }
    saveLoggedInUser(""); // to make session done, null it
    return res.status(200).send("Okey Logout");
});

// 404 Page Handle
app.all(/.*/, (req, res) => {
    return res.status(404).send("404, Page Not Found! by Me :D");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
