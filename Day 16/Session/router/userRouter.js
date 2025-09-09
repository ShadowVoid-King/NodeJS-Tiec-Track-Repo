const express = require('express'); 
const { getAllUsers } = require('../controllers/userController')
const { DeleteUser } = require('../controllers/userController');
const router = express.Router();


router.get('/all-user', getAllUsers);
router.delete('/delete/:id', DeleteUser);




module.exports = router;