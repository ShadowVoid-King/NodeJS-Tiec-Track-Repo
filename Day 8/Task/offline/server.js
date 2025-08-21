const express = require("express");

const app = express();

app.use(express.json()); // middleware to make express to read json

const users = [];
// [ {username: "Moha", password: "1234"}]

function findUser(username) {
    return users.find((x) => x.username === username);
}

// register
app.post("/register", (request, respone) => {
    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;

    users.push({username, password, email});
    respone.status(200).send("Register Successfully");
});
// login

app.post("/login", (request, respone) => {
    const user = findUser(request.body.username);
    if (user !== undefined) {
        if (user.password === request.body.password) {
            respone.status(200).send("Welcome " + user.username);
        } else {
            respone.status(401).send("Wrong username or password");
        }
    }
})

// get user data

app.get("/profile", (request, respone) => {
        const user = findUser(request.query.username);
    if (user !== undefined) {
        respone.json({
            username: user.username,
            // password: request.query.password,
            email: user.email
        });
    } else {
        respone.status(401).send("Wrong username or password");
    }
});

app.listen(3000, () => {
    console.log("Server IS Running ..............");
});