const fetchGETREQUEST = require('../../utils/fetchServer');

const getAllUsers = async (req, res) => {
    try {
        const url = `http://127.0.0.1:4000/auth/all-user`;
        const data = await fetchGETREQUEST(url);
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllUsers }