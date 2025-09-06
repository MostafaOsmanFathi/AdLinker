const express = require("express");
const userController = require("../controller/user.controller");
const linkController = require("../controller/link.controller");
const userValidation = require("../middleware/validators/UserValidators");
const authorization = require("../middleware/authorization");
const validateLink = require("../middleware/validators/linkValidators");

const userRouter = express.Router();

/// Unauthorized Use
userRouter
    .route("/register")
    .post(userValidation.registerUserValidation, userController.registerUser);

userRouter
    .route("/login")
    .post(userValidation.loginUserValidation, userController.loginUser);

module.exports = userRouter;
