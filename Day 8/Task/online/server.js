const express = require('express')


const app = express()

app.use(express.json())


let users = [{},{},{}]

app.post('/login' , (req,res) => {
    let {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    for (let user of users) {
        if (user.username === username && user.password === password) {
            return res.status(200).send('Login successful');
        }
    }
    return res.status(401).send('Invalid username or password');    

})

app.post('/register' , (req,res) => {
    let {username ,password, email} = req.body;
    if (!username || !password || !email) {
        return res.status(400).send('All fields are required');
    }
    for (let user of users) {
        if (user.username === username || user.email === email) {
            return res.status(400).send('Username or email already exists');
        }
    }
    users.push({username, password, email});
    return res.status(201).send('User registered successfully');
})

app.get('/user' ,(req,res) => {
    let username = req.query.username;
    if (!username) {
        return res.status(400).send('Username is required');
    }
    for (let user of users) {
        if (user.username === username) {
            return res.status(200).json(user);
        }
    }
    return res.json({'message' : 'username Not Found'})
})


// server listen

app.listen(3000,() =>{
    console.log("Server is running on port 3000........")
})