// Functions
const {
	loadUsers,
	loadLoggedInUser,
} = require("../utils");

const users = [];

loadUsers(users);
const loggedInUSer = loadLoggedInUser(users);

module.exports = {users, loggedInUSer};
/* 
get error because it was object {}
it can be fix if i use {} in export, require
 */