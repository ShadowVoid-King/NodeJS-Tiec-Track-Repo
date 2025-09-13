const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./config/connDB');
const postRouter = require('./router/postRouter');
const {checkReq} = require('./middleware/checkREQ')
const app = express();
app.use(express.json());
app.use(cors());
app.use(checkReq)

connectDB();




app.use('/posts', postRouter);




mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
});