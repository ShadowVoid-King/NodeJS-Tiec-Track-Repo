const forgotPasswordGet = (req, res) => {
    try {
        res.render('Auth/forgotpassword.ejs');
    } catch (error) {
        console.log(error);
		return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {forgotPasswordGet}