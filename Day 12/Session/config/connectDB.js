const mongoose = require("mongoose")
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '../.env') });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) // to connect to the database and access variables
        console.log("Databse connected ..........");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectDB }