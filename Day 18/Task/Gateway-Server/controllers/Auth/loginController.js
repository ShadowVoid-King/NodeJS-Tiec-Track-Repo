const { fetchPOSTREQUEST } = require('../../utils/fetchServer');

const login = async (req, res) => {
    console.log("Gateway: received request at /auth/login", req.body);
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
        console.log("Gateway: received request at /auth/login", req.body);
        return res.status(400).json({ message: "All inputs are required" });
    }

    try {
        const data = await fetchPOSTREQUEST(
            'http://127.0.0.1:3000/auth/login',
            { usernameOrEmail, password }
        );

        if (!data) {
            return res.status(502).json({ message: "No response from Auth service" });
        }

        if (data.token) {
            req.session.token = data.token;
            return res.json({ message: data });
        } else {
            // forward the error message from auth
            return res.status(401).json({ message: data.message || "Unauthorized" });
        }
    } catch (err) {
        console.error("Gateway login error:", err);
        return res.status(500).json({ message: "Gateway error", error: err.message });
    }
};

module.exports = { login };
