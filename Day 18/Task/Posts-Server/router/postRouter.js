const express = require('express')
const router = express.Router()
const { addNewPost } = require('../controllers/addNew-PostController')
const { getPostByID } = require('../controllers/getPostByIDController')
const { deletePost } = require('../controllers/deletePostController')


router.get('/get-post/:id', getPostByID)
router.post('/add-new-post', addNewPost)
router.delete('/delete-post/:id', deletePost)




module.exports = router