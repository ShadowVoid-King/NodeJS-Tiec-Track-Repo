const express = require('express')
const router = express.Router()

const { loginController } = require('../controllers/Auth/loginController');
const { registerController } = require('../controllers/Auth/registerController');



router.post('/login', loginController)
router.post('/register', registerController)



module.exports = router