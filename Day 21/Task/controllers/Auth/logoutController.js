const logout = (req, res) => {
    req.session.destroy(
        (err) =>{
            if(err) {
                return res.status(500).json({ message: "Error logging out" });
            }
            return res.json({ message: "Logout successful" });
        }
    );
}

module.exports = {logout}