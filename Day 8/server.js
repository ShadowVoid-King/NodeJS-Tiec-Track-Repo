// import express from "./express"
const express = require("express");

const app = express();

app.use(express.json()); // middleware to make express to read json

/*
// respone.json({
//     "message": "Login Page 3"
// }) // to send JSON in resquest
// console.log("Login Page 1"); // it will print in terminal console
app.get("/login", (request, respone) => {
	respone.send("Hello, Login Page");
});

app.post("/login", (request, respone) => {
	data = {
		username: request.body.username,
		password: request.body.password,
	};

	if (data.username === "Moha" && data.password === "1234") {
		respone.status(200).send("Welcome " + data.username);
	} else {
		respone.status(401).send("Wrong username or password");
	}
});
*/
// app.get("/register", (request, respone) => {
// 	respone.send("Hello, Register Page");
// });

db = [];

app.post("/register", (request, respone) => {
	// let username = request.body.username;
	// let password = request.body.password;

	data = {
		username: request.body.username,
		password: request.body.password,
	};
	//
	indexSearch = db.findIndex((x) => x.username === data.username); // it will return index or -1

	if (indexSearch !== -1) {
		// respone.status(200).send("Welcome " + data.username);
		return respone
			.status(401)
			.send("This is username already exists " + data.username, data.password);
	} else {
		// respone.status(401).send("Wrong username or password");
		db.push(data);
		return respone.status(200).send("Register Successfully");
	}
});
console.log(db);
app.listen(3000, () => {
	console.log("Server IS Running ..............");
});

app.get("/profile", (request, respone) => {
	respone.json({
		username: request.query.username,
		age: request.query.age,
		country: request.query.country,
	});
});
