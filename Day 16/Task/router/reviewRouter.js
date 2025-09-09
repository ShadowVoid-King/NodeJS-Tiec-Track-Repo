const express = require('express'); 
const { reviewOrderController } = require('../controllers/reviewOrderControllers')
const router = express.Router();

router.post('/review-order',reviewOrderController)



module.exports = router;