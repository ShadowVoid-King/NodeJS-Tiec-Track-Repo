const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./index.html"));
});

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
		// join the room named 'some room'
		socket.join("some room");

		// broadcast to all connected clients in the room
		io.to("some room").emit("hello", "world");

		// broadcast to all connected clients except those in the room
		io.except("some room").emit("hello", "world");

		// leave the room
    socket.leave("some room");
    
	});
});

httpServer.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}.........`);
});
