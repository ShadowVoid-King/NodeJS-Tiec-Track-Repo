const { message } = require("statuses");
const { userData } = require("../models/users");
const register = async(req, res) => {
	const { firstName, lastName, email,age, password } = req.body;
	if (!firstName || !lastName || !email || !password || !age) {
		return res.status(400).send("All fields are required");
    }
    // check if user already exists
    const CheckUser = await userData.findOne({ email }); //findone > returns a promise > returns a user > search for one thing
    if (CheckUser) {
        return res.status(400).json({ message: "User already exists" });
    }
	const addNewUser = new userData({
		// keys should be the same as the schema
		firstName,
		lastName,
        email,
        age,
		password,
    });
    
    await addNewUser.save(); // to save the data to the database
	return res.status(200).send("User registered successfully");
};

module.exports = {
	register,
};
