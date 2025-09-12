const express = require("express");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./router/authRouter");
const postRouter = require("./router/postRouter");
const groupRouter = require("./router/groupRouter");
const reelsRouter = require("./router/reelsRouter");

const app = express();
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cors());
// Middleware 
app.use((req, res, next) => {
	console.log("GATEWAY INCOMING REQUEST:", req.method, req.path, req.body);
	next();
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: 1000 * 60,
			httpOnly: true,
		},
	})
);

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/groups", groupRouter);
app.use("/reels", reelsRouter);
// app.get('/ping', (req, res) => res.send('pong'));


app.listen(process.env.PORT, () => {
	console.log(
		`Gateway Server is running on port ${process.env.PORT}...........`
	);
});
