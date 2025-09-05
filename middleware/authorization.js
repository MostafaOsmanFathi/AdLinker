const jwt = require('jsonwebtoken');
const env = require('../env.js')

let userCheck = async (req, res, next) => {
    const token = req.split(' ')[1]
    const isAuthenticated = await jwt.verify(token, env.JWT_SECRET);
    if (!isAuthenticated) {
        res.status(401).json({error: "Authentication failed"});
    }
    next();
}


let authorizeUserType = (userType) => {
    return async (req, res, next) => {
        const token = req.split(' ')[1]
        const isAuthenticated = await jwt.verify(token, env.JWT_SECRET);
        if (!isAuthenticated) {
            res.status(401).json({error: "Authentication failed"});
        }
        const decoded = jwt.decode(token, env.JWT_SECRET)
        if (decoded.user_type !== userType) {
            return res.status(401).json({error: "not authorized user"});
        }
        next();
    }
}


module.exports = {
    userCheck, authorizeUserType
}