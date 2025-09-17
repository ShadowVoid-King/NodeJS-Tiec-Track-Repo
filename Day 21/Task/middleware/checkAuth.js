const jwt = require("jsonwebtoken");
const path = require("path");
const checkAuth = (req, res, next) => {
    const getToken = req.session.token; 
    if (!getToken) {
        return res.render('Auth/index.ejs')
    } else {
        jwt.verify(getToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.render('Auth/index.ejs');
            } else {
                req.user = decode;
                next();
            }
        });
        
    }
    // verify(getToken, process.env.JWT_SECRET);
}


module.exports = {checkAuth}