const express = require("express");
const accountController = require("../controller/account.controller");
const userValidation = require("../middleware/validators/UserValidators");
const authorization = require("../middleware/authorization");

const accountRouter = express.Router();

/// Unauthorized Use
accountRouter
    .route("/register")
    .post(userValidation.registerUserValidation, accountController.registerUser);

accountRouter
    .route("/login")
    .post(userValidation.loginUserValidation, accountController.loginUser);


accountRouter
    .route("/my-account")
    .get(authorization.loggedInCheck, accountController.getMyAccountData)
    .put(userValidation.updateUserValidation, authorization.loggedInCheck, accountController.changeMyAccountData)
    .delete(authorization.loggedInCheck, accountController.deleteMyAccount)

accountRouter.route("/logout").post(authorization.loggedInCheck, accountController.logoutUser);


accountRouter
    .route("/my-visits-history")
    .get(authorization.loggedInCheck, accountController.getAllAccountVisits)


module.exports = accountRouter;
