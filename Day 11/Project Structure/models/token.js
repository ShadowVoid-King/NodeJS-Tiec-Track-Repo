const { mongoose } = require("mongoose");

const tokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 // 60 seconds = 1 minute
    }
});

// module.exports = mongoose.model("Token", tokenSchema);
//or
const tokenData = mongoose.model("Token", tokenSchema);
module.exports = { tokenData };