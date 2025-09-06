const express = require("express");
const accountController = require("../controller/account.controller");
const userValidation = require("../middleware/validators/UserValidators");
const authorization = require("../middleware/authorization");

const userRouter = express.Router();

/// Unauthorized Use
userRouter
    .route("/register")
    .post(userValidation.registerUserValidation, accountController.registerUser);

userRouter
    .route("/login")
    .post(userValidation.loginUserValidation, accountController.loginUser);


userRouter
    .route("/my-account")
    .get(authorization.loggedInCheck, accountController.getMyAccountData)
    .put(userValidation.updateUserValidation, authorization.loggedInCheck, accountController.changeMyAccountData)
    .delete(authorization.loggedInCheck, accountController.deleteMyAccount)

userRouter.route("/logout").post(authorization.loggedInCheck)

module.exports = userRouter;
