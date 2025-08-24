// Express Server Entry Point
const express = require("express");
const { loadTasks, loadUsers, saveTasks, saveUsers } = require("./bouns"); // U Forget Add saveUsers Here

const app = express();
const PORT = 6060;

// Local Database
const tasks = [];
const users = [];

loadTasks(tasks, "data/tasks.json"); // [{},{},{}]
loadUsers(users, "data/users.json"); // [{},{},{}]

// Middleware
app.use(express.json());

// Routes
app.get("/api/tasks", (req, res) => {
	// should get all tasks from tasks array
	return res.json(tasks); // call back Tasks array
});

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

app.post("/api/tasks", (req, res) => {
	// body should contain these info title, description, priority(high, low, medium)
	// KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
	// object come inside array
	const { title, description, priority } = req.body;

	if (!title || !description || !priority) {
		// if there is no Data Come it Error Message
		return res.status(400).send("Missing required fields");
	}
	if (!["high", "medium", "low"].includes(priority)) {
		//
		return res.status(400).send("Invalid priority value");
	}
	tasks.push({ title, description, priority });
	saveTasks(tasks, "data/tasks.json"); // skip
	res.status(201).send("Task added successfully");
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

app.post("/register", (req, res) => {
	// body should contain these info username, email, password
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).send("Missing required fields");
	}
	if (users.find((u) => u.username === username)) {
		return res.status(409).send("Username already exists");
	}
	users.push({ username, email, password });
	res.status(201).send("User registered successfully");
	// KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
	saveUsers(users, "data/users.json"); // Change to saveUsers
});

app.post("/login", (req, res) => {
	// body should contain these info username or email, password
	const { username, password, email } = req.body;
	const user = users.find(
		(u) =>
			(u.username === username || u.email === email) && u.password === password
	);
	if (user) {
		return res.status(200).send(`Welcome ${user.username}`);
	} else {
		return res.status(401).send("Invalid username or password");
	}
});

app.delete("delete", (req, res) => {
	const { username, password } = req.body;
	// if ( !username && !password)
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
