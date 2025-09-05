const express = require('express');
const userController = require('../controller/user.controller.js');
const userValidation = require('../middleware/validators.js');
const authorization = require('../middleware/authorization.js');

const userRouter = express.Router();
//admin authorized only
userRouter.route('/user').get(authorization.authorizeUserType('admin'), userController.getAllUsers)
    .delete(userValidation.emailValidation,
        authorization.authorizeUserType('admin'),
        userController.deleteUserByEmail);


userRouter.route('/deleteAllUsers').delete(userValidation.emailValidation, authorization.authorizeUserType('admin'), userController.deleteAllUsers);


/// Unauthorized Use
userRouter.route('/user/register').post(userValidation.registerUserValidation, userController.registerUser);
userRouter.route('/user/login').get(userValidation.loginUserValidation, userController.loginUser);


module.exports = userRouter;