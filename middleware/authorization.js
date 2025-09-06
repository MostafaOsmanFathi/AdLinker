const jwt = require("jsonwebtoken");
const env = require("../config/env");
const linkModel = require("../model/link.model");

let userCheck = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const isAuthenticated = await jwt.verify(token, env.JWT_SECRET);
    if (!isAuthenticated) {
        res.status(401).json({error: "Authentication failed"});
    }
    next();
};

let authorizeUserType = (userType) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const isAuthenticated = await jwt.verify(token, env.JWT_SECRET);
            if (!isAuthenticated) {
                res.status(401).json({error: "Authentication failed"});
            }
            const decoded = jwt.decode(token, env.JWT_SECRET);
            if (decoded.user_type !== userType) {
                return res.status(401).json({error: "not authorized user"});
            }
            req.auth_user_data = {
                user_type: decoded.user_type,
                name: decoded.name,
                email: decoded.email,
            };
            next();
        } catch (error) {
            return res.status(401).json({error: "not authorized user"});
        }
    };
};
let authorizePublisherLinkParam = async (req, res, next) => {
    try {
        const linkID = req.params.linkID;
        const result = await linkModel.findOne({shorten_link: linkID});
        if (!result) {
            return res.status(401).json({error: "link not found"});
        }
        if (result.publisher_email !== req.auth_user_data.email) {
            return res
                .status(401)
                .json({error: "not authorized user this link is not yours"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "not authorized user"});
    }
};

module.exports = {
    userCheck,
    authorizeUserType,
    authorizePublisherLinkParam,
};
