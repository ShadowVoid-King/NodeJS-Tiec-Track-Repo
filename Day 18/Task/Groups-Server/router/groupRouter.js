const express = require('express')
const router = express.Router()
const { createGroup } = require('../controllers/createGroupController')
const { getGroupByID } = require('../controllers/getGroupByIDController')
const { addPostToGroup } = require('../controllers/addPostToGroupController')

router.get('/get-group/:id', getGroupByID)
router.post('/create-group', createGroup)
router.post('/add-post-to-group', addPostToGroup)


module.exports = router