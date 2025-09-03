/* 
{

  "message": "Logged out successfully"

}
Error Responses:

- `200`: Not authenticated message
- `404`: Can't logout
*/

const { SessionData } = require("../../models/session");

const logout = async(req,res) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.json({message: "Token is required"})
        }
        const checkToken = await SessionData.findOne({token});
        if (!checkToken) {
            return res.json({message: "Unauthorized - Expired Token"})
        }
        await SessionData.deleteOne({token});
        return res.json({message: "Logout Successful"})
    }
    catch (error) {
        return res.json({message: error.message})
    }
    

}

module.exports = {logout} 
