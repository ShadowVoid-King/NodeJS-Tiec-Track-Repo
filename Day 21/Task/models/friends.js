const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // owner user
  friends: { type: [String], default: [] } // friend usernames
});

const friendsData = mongoose.model("friends", friendsSchema);
module.exports = { friendsData };
