const profile = (req, res) => {
    // const { name } = req.params;
    // return res.send(`Welcome to your profile ${name}`);
    return res.render("profile", {
        // username: req.params.name,
        // age: req.query.age,
        // phone: req.query.phone,
        username: req.params.name,
        age: 99,
        phone: "100",
        role: "ADMIN"
    });
}

module.exports = {
    profile
}