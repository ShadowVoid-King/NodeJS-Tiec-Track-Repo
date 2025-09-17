const express = require("express");
const router = express.Router();

const { chatController } = require("../controllers/Chat/chatController");
const { getFriends, addFriend } = require("../controllers/Chat/friendsController");

// Render chat page at '/chat'
router.get("/", chatController);
router.get("/get-friends", getFriends);
router.post("/add-friend", addFriend);

module.exports = router;
