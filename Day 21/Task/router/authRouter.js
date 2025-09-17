const express = require('express')
const router = express.Router()

const { registerPost, registerGet } = require('../controllers/Auth/registerController')
const { loginPost, loginGet } = require('../controllers/Auth/loginController')
const { forgotPasswordGet } = require('../controllers/Auth/forgot-passwordController')
const { sendOTP } = require('../controllers/Auth/send-otpController')
const { newPasswordGet, newPasswordPost } = require('../controllers/Auth/new-passwordController')
const { logout } = require('../controllers/Auth/logoutController')
const { checkAuth } = require('../middleware/checkAuth')


router.get('/register', registerGet)
router.post('/register', registerPost)

router.post('/login', loginPost)
router.get('/login', loginGet)

router.get('/forgot-password', forgotPasswordGet)

router.post('/send-otp', sendOTP)



router.get('/new-password', newPasswordGet)



router.post('/new-password', newPasswordPost)

router.get('/logout', checkAuth ,logout)


module.exports = router