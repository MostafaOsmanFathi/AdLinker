const express = require('express');
const authorization = require('../middleware/authorization');
const linkValidator = require('../middleware/linkValidators')
const linkController = require('../controller/link.controller');

const linkRoute = express.Router();

linkRoute.route("/admin/link")
    .get(authorization.authorizeUserType('admin'), linkController.getAllLinks)
    .delete(linkValidator.validateLink,
        authorization.authorizeUserType('admin'), linkController.deleteLinkByShorten_link);

linkRoute.route("/admin/deleteAllLinks")
    .delete(authorization.authorizeUserType('admin'), linkController.deleteAllLinks);


linkRoute.route('/link/createLink')
    .post(linkValidator.validateCreateLink, authorization.authorizeUserType('publisher'), linkController.createLink)

linkRoute.route('/link/forward/:linkID').get(linkValidator.validateFrowardLink, linkController.forwardLink)

module.exports = linkRoute
