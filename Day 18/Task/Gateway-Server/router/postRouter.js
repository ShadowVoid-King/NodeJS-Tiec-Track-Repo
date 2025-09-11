const express = require('express');

const { addNewPost } = require('../controllers/Post/addNew-PostController')
const { getPostByID } = require('../controllers/Post/getPostByIDController')
const { deletePost } = require('../controllers/Post/deletePostController')

const router = express.Router();

router.get('/get-post/:id', getPostByID)
router.post('/add-new-post', addNewPost)
router.delete('/delete-post/:id', deletePost)

module.exports = router