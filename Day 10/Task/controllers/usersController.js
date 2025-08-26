/* 
app.get('/users')
app.post('/delete-user/:id')
*/

let { users } = require("../models/users");
const { loadLoggedInUser, loadUsers, saveUsers } = require("../utils");

loadUsers(users, "data/users.json");

const loggedInUSer = loadLoggedInUser("data/loggedInUser.json");

const userGET = (req, res) => {
    if (!loggedInUSer) {
        return res.status(401).send("401, Unauthorized");
    }

    if (loggedInUSer.role !== "admin") {
        return res.status(403).send("403, Forbidden");
    }

    /* 
    id
    username
    fullName
    email
    */
    
    filteredUsers  = users.map((user) => ({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
    }));
    return res.render("manage-users", { users: filteredUsers, user: loggedInUSer ,search: false});
};

const deleteUserByID = (req, res) => {
    // get id from url is string, string != number || use !== instead of !==
    const id = parseInt(req.params.id); 
    users = users.filter(u => u.id !== id); // delete by id not index
    saveUsers(users, "data/users.json");
    return res.render("manage-users", { users, user: loggedInUSer ,search: false});
};

module.exports = { userGET, deleteUserByID };