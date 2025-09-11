const express = require('express');

const {addNewReel} = require('../controllers/Reel/addReelController')
const {getReelByID} = require('../controllers/Reel/getReelByIDController')
const {getAllReels} = require('../controllers/Reel/getAllReelsController')

const router = express.Router();

router.get('/get-reel/:id', getReelByID)
router.get('/get-all-reels', getAllReels)
router.post('/add-new-reel', addNewReel)

module.exports = router