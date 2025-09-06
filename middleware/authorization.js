const jwt = require("jsonwebtoken");
const env = require("../config/env");
const linkModel = require("../model/link.model");
const userLinkVisitHistoryModel = require("../model/userLinkVisitHistory.model");

let loggedInCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, env.JWT_SECRET);

        req.auth_user_data = {
            user_type: decoded.user_type,
            name: decoded.name,
            email: decoded.email,
        };
        next();
    } catch (error) {
        res.status(401).json({error: "Authentication failed"});
    }
};

let recordVisitIfLoggedInAndPass = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, env.JWT_SECRET);

        const linkID = req.params.linkID
        const email = decoded.email;
        const newHistoryModel = new userLinkVisitHistoryModel({email, visited_shorten_link_id: linkID})
        await newHistoryModel.save();
        next();
    } catch (error) {
        next()
    }
}

let authorizeUserType = (userType) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, env.JWT_SECRET);
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
    loggedInCheck,
    authorizeUserType,
    authorizePublisherLinkParam,
    recordVisitIfLoggedInAndPass
};
