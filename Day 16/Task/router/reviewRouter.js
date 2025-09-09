const express = require('express'); 
const { reviewOrderController } = require('../controllers/reviewOrderControllers')
const router = express.Router();

router.post('/review-order/:id',reviewOrderController)



module.exports = router;