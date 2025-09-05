const express = require('express');
const userController = require('../controller/user.controller.js');
const linkController = require('../controller/link.controller.js');
const userValidation = require('../middleware/UserValidators.js');
const authorization = require('../middleware/authorization.js');
const validateLink = require("../middleware/linkValidators");

const userRouter = express.Router();
//admin authorized only
userRouter.route('/admin/user')
    .get(authorization.authorizeUserType('admin'), userController.getAllUsers)
    .delete(userValidation.emailValidation,
        authorization.authorizeUserType('admin'),
        userController.deleteUserByEmail);

userRouter.route('/admin/deleteAllUsers').delete(userValidation.emailValidation, authorization.authorizeUserType('admin'), userController.deleteAllUsers);

//only authorized publisher
userRouter.route('/publisher/my-links')
    .get(authorization.authorizeUserType('publisher'), linkController.getAllPublisherLinks)
    .delete(authorization.authorizeUserType('publisher'), linkController.deleteAllPublisherLinks);

userRouter.route('/publisher/mangeLink/:linkID')
    .get(validateLink.validateParamLink, authorization.authorizeUserType("publisher"), authorization.authorizePublisherLinkParam, linkController.getLink)
    .put(validateLink.validateParamLink, validateLink.validatePutLink, authorization.authorizeUserType("publisher"), authorization.authorizePublisherLinkParam, linkController.publisherChangeLink)
    .delete(validateLink.validateParamLink, authorization.authorizeUserType("publisher"), authorization.authorizePublisherLinkParam, linkController.publisherDeleteLink);

/// Unauthorized Use
userRouter.route('/user/register').post(userValidation.registerUserValidation,
    userController.registerUser);
userRouter.route('/user/login').post(userValidation.loginUserValidation, userController.loginUser);


module.exports = userRouter;