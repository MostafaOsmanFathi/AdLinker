const express = require("express");
const linkController = require("../controller/link.controller");
const authorization = require("../middleware/authorization");
const validateLink = require("../middleware/validators/linkValidators");
const linkValidator = require("../middleware/validators/linkValidators");

//only authorized publisher

const publisherRouter = express.Router();

publisherRouter
    .route("/my-links")
    .get(
        authorization.authorizeUserType("publisher"),
        linkController.getAllPublisherLinks
    )
    .delete(
        authorization.authorizeUserType("publisher"),
        linkController.deleteAllPublisherLinks
    );

publisherRouter
    .route("/mangeLink/:linkID")
    .get(
        validateLink.validateParamLink,
        authorization.authorizeUserType("publisher"),
        authorization.authorizePublisherLinkParam,
        linkController.getLink
    )
    .put(
        validateLink.validateParamLink,
        validateLink.validatePutLink,
        authorization.authorizeUserType("publisher"),
        authorization.authorizePublisherLinkParam,
        linkController.publisherChangeLink
    )
    .delete(
        validateLink.validateParamLink,
        authorization.authorizeUserType("publisher"),
        authorization.authorizePublisherLinkParam,
        linkController.publisherDeleteLink
    );

publisherRouter
    .route("/createLink")
    .post(
        linkValidator.validateCreateLink,
        authorization.authorizeUserType("publisher"),
        linkController.createLink
    );
publisherRouter
    .route("/set-link-public/:linkID")
    .get(
        validateLink.validateParamLink,
        authorization.authorizeUserType("publisher"),
        authorization.authorizePublisherLinkParam, linkController.setLinkPublic);

publisherRouter
    .route("/set-link-private/:linkID")
    .get(
        validateLink.validateParamLink,
        authorization.authorizeUserType("publisher"),
        authorization.authorizePublisherLinkParam, linkController.setLinkPrivate);


module.exports = publisherRouter;
