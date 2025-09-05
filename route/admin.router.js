const express = require("express");
const userController = require("../controller/user.controller");
const linkController = require("../controller/link.controller");
const userValidation = require("../middleware/UserValidators");
const authorization = require("../middleware/authorization");
const linkValidator = require("../middleware/linkValidators");

//admin authorized only

const adminRouter = express.Router();

adminRouter
    .route("/user")
    .get(authorization.authorizeUserType("admin"), userController.getAllUsers)
    .delete(
        userValidation.emailValidation,
        authorization.authorizeUserType("admin"),
        userController.deleteUserByEmail
    );

adminRouter
    .route("/deleteAllUsers")
    .delete(
        userValidation.emailValidation,
        authorization.authorizeUserType("admin"),
        userController.deleteAllUsers
    );

adminRouter
    .route("/link")
    .get(authorization.authorizeUserType("admin"), linkController.getAllLinks)
    .delete(
        linkValidator.validateLink,
        authorization.authorizeUserType("admin"),
        linkController.deleteLinkByShorten_link
    );

adminRouter
    .route("/deleteAllLinks")
    .delete(
        authorization.authorizeUserType("admin"),
        linkController.deleteAllLinks
    );

module.exports = adminRouter;
