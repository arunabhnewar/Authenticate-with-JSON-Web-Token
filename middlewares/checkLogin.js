const jwt = require("jsonwebtoken");


const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { username, userId } = decoded;
        req.username = username;
        req.userId = userId;
        next();
    } catch (error) {
        next("Authentication failure!");
    }
};


// Module exports
module.exports = checkLogin;