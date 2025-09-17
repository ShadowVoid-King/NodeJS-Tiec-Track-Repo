// for next task
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    message:  { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const messagesData = mongoose.model("messages", messageSchema);
module.exports = { messagesData };
