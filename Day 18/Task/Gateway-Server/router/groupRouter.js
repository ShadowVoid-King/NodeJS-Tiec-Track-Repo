const express = require('express');

const { addPostToGroup } = require('../controllers/Group/addPostToGroupController')
const { createGroup } = require('../controllers/Group/createGroupController')
const { getGroupByID } = require('../controllers/Group/getGroupByIDController')

const router = express.Router();

router.get('/get-group/:id', getGroupByID)
router.post('/create-group', createGroup)
router.post('/add-post-to-group', addPostToGroup)

module.exports = router