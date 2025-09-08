const express = require("express");
const { getAll, createNewUser } = require("../controllers/usersController");
const router = express.Router();

// Create Get All, Post /new
router.get("all", getAll);
router.post("/new", createNewUser);


module.exports = router;
