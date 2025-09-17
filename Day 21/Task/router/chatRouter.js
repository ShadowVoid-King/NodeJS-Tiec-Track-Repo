const express = require("express");
const router = express.Router();

const { chatController } = require("../controllers/Chat/chatController");
const { getFriends, addFriend } = require("../controllers/Chat/friendsController");
const { getHistory } = require("../controllers/Chat/messagesController");

// Render chat page at '/chat'
router.get("/", chatController);
router.get("/get-friends", getFriends);
router.post("/add-friend", addFriend);
router.get("/history", getHistory);

module.exports = router;
