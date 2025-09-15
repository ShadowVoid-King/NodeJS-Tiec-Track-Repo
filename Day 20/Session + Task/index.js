const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Serve frontend
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Store { username: socketId }
let users = {};

io.on("connection", (socket) => {
	// New connection + logs
	console.log("New connection:", socket.id);

	// User sets their username
	socket.on("set_username", (username) => {
		users[username] = socket.id;
		io.emit("user_list", Object.keys(users)); // send list of usernames
	});

	// Private message
	socket.on("private_message", ({ from, to, message }) => {
		const recipientSocketId = users[to];
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("private_message", { from, message });
		} else {
			io.to(socket.id).emit(
				"error_message",
				`⚠️ User ${to} is offline or not found`
			);
		}
	});

	// Disconnect
	socket.on("disconnect", () => {
		// remove username by socket.id
		const username = Object.keys(users).find((key) => users[key] === socket.id);
		if (username) {
			delete users[username];
			io.emit("user_list", Object.keys(users));
		}
	});
});

httpServer.listen(3000, () => {
	console.log("Server running on http://127.0.0.1:3000");
});
