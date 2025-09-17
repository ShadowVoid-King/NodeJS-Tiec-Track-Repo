// for next task
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message:  { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

messageSchema.index({ sender: 1, receiver: 1, createdAt: 1 });

const messagesData = mongoose.model("messages", messageSchema);
module.exports = { messagesData };
