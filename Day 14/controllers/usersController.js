const getAll = (req, res) => {
    res.send("Get All Users");
}

const createNewUser = (req, res) => {
    res.send("Create New User");
}

module.exports = { getAll, createNewUser }