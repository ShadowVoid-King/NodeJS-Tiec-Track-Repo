const express = require('express')
const router = express.Router()

const { addNewReel } = require('../controllers/addReelController')
const { getReelByID } = require('../controllers/getReelByIDController')
const { getAllReels } = require('../controllers/getAllReelsController')

router.get('/get-reel/:id', getReelByID)
router.get('/get-all-reels', getAllReels)
router.post('/add-new-reel', addNewReel)

module.exports = router