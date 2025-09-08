dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { connectDB } = require('./config/connDB');
const mongoose = require('mongoose');
const authRouter = require('./router/authRouter')
const session = require("express-session");


const { checkAuth } = require('./middleware/checkAuth');
// Error TypeError: argument handler must be a function because of import as {}
const  usersRouter = require('./router/usersRouter');
const  studentsRouter  = require('./router/studentsRouter');

const app = express();
app.use(express.json())


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 5 * 60, // 5 minutes
        httpOnly: true,
        secure: false
    }
}));

connectDB()

// Routes
app.use('/auth', authRouter) // login register logout send-otp forget-password
app.use('/users', usersRouter) // all, add, get:id, update, delete users
app.use('/students', checkAuth, studentsRouter) // all, add, get:id, update, delete students


mongoose.connection.once('connected', () => {
    console.log("MongoDB connected..............");
    app.listen(process.env.PORT, () => console.log('Server Runing...........'))
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})


