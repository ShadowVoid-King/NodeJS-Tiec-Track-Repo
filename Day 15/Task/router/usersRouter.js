const express = require('express');

const { getAllUsers } = require('../controllers/UsersControllers/getAllUsersController');
const { AddUser } = require('../controllers/UsersControllers/addUserController');
const { getUserById } = require('../controllers/UsersControllers/getUserByIdController');
const { updateUser } = require('../controllers/UsersControllers/updateUserController');
const { deleteUser } = require('../controllers/UsersControllers/deleteUserController');

const router = express.Router();

router.get('/all-users', getAllUsers);
router.post('/add-user', AddUser);
router.get('/getUser/:id', getUserById);
router.put('/edit-user/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router