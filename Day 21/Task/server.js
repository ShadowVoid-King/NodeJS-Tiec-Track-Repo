const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const { connectDB } = require("./config/connDB");
const session = require("express-session");
const cors = require("cors");
const { checkAuth } = require("./middleware/checkAuth");

// Router
const authRouter = require("./router/authRouter");
const chatRouter = require("./router/chatRouter");

const app = express();
app.use(express.json()); // handles application/json
app.use(express.urlencoded({ extended: true })); // handles form data
const server = http.createServer(app);
const io = new Server(server);
let currentPort = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 5, // 5 minutes
			httpOnly: true,
		},
	})
);
app.set("view engine", "ejs");
// Use relative joins without leading slash to avoid resetting to drive root
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
connectDB();

// Main Routes
app.use("/auth", authRouter);
app.use("/chat", checkAuth, chatRouter); // Private Route

// 404 Page
app.all(/.*/, (req, res) => {
	res.status(404).render("Auth/404.ejs");
});

// Socket Connection
io.on("connection", (socket) => {
	socket.on("register", (username) => {
		socket.join(username);
		socket.username = username;
	});

	socket.on("private-message", ({ to, message }) => {
		io.to(to).emit("private-message", {
			from: socket.username,
			message,
		});
	});

	// Typing indicator relay
	socket.on("typing", ({ to, isTyping }) => {
		if (!to) return;
		io.to(to).emit("typing", { from: socket.username, isTyping });
	});

	socket.on("disconnect", () => {
		console.log(`${socket.username} disconnected`);
	});
});
// DB Connection
mongoose.connection.once("connected", () => {
	console.log("Connected to MongoDB...........");
	const startServer = () => {
		server.listen(currentPort, () => {
			console.log(`Server running on http://localhost:${currentPort}..........`);
		});
	};

	server.on("error", (err) => {
		if (err.code === "EADDRINUSE") {
			console.warn(`Port ${currentPort} is in use. Trying ${currentPort + 1}...`);
			currentPort += 1;
			setTimeout(startServer, 500);
		} else {
			console.error(err);
		}
	});

	startServer();
});

mongoose.connection.on("error", (err) => {
	console.log(err);
});
