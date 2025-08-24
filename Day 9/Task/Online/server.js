// Express Server Entry Point
const express = require("express");
const app = express();
const PORT = 6060;

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
	const keyword = req.query.keyword;
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
		username: req.body.username, // GET USERNAME FROM THE USER CURRENTLY LOGGED IN
    };
    // Add Check if user logged in or not from data/loggedinUser.Json
    if (!task.title || !task.description || !task.priority || !task.username) {
        // if there is no Data Come it Error Message
        return res.status(400).send("Missing required fields");
    }
    if (!users.find((u) => u.username === loggedInUSer.username)) {
        return res.status(401).send("401 Unauthorized");
    }
    if (!["high", "medium", "low"].includes(task.priority)) {
        //
        return res.status(400).send("Invalid priority value");
    }
    tasks.push(task);


	// KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
	saveTasks(tasks, "data/tasks.json");
});

// YOU MUST BE LOGGED IN TO DO IT OR YOU ARE THE CREATOR OF THE TASK
app.delete("/api/tasks/", (req, res) => {
    // request should contain id of task to delete
    // who can delete task will be user of task or admin role
    // user should authenizcated to see his tasks
    const id = req.query.id;
    
    

	// KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
	saveTasks(tasks, "data/tasks.json");
});

app.get("/profile", (req, res) => {
	// we get query string from req and search user in users array
	const username = req.query.username;
	const user = users.find((u) => u.username === username);
	if (user) {
		return res.json({
			username: user.username,
			email: user.email,
		}); // it will break if not
	}
	return res.status(404).send("User not found");
});

// YOU MUST BE LOGGED IN AND HAVE ADMIN ROLE TO DO IT
app.delete("/profile", (req, res) => {
	// we get query string from req and search user in users array then delete this user
});

//~ Done
app.post("/register", (req, res) => {
	// body should contain these info username, email, password, role (ADMIN or USER)
	const { username, email, password, role} = req.body;
	if (!username || !email || !password || !role) {
		return res.status(400).send("Missing required fields");
	}
	if (users.find((u) => u.username === username)) {
		return res.status(409).send("Username already exists");
	}
	users.push({ username, email, password, role});
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
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
