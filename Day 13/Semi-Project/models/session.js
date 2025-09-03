/* 
{

    username: String (required),

    token: String (required),

    role: String (enum: ["user", "admin"], default: "user"),

    createdAt: Date (default: Date.now, expires: '1h')

}
*/

const mongoose = require("mongoose");

const Session = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600  , // 1 hour
    }
});

const SessionData = mongoose.model("session", Session);
module.exports = { SessionData };
