const express = require('express');
const {login} = require('../controllers/AuthControllers/loginController');
const {register} = require('../controllers/AuthControllers/registerController');
const { logout } = require('../controllers/AuthControllers/logoutController');
const { sendOtp } = require('../controllers/AuthControllers/send-OtpController');
const { forgetPassword } = require('../controllers/AuthControllers/forgot-PasswordController');
const { checkAuth } = require('../middleware/checkAuth');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', checkAuth,logout);

router.post('/send-otp', sendOtp);
router.post('/forget-password', forgetPassword);


module.exports = router