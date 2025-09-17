const express = require("express");
const linkValidator = require("../middleware/validators/linkValidators");
const linkController = require("../controller/link.controller");
const authorization = require("../middleware/authorization");
const linkRouter = express.Router();

linkRouter
    .route("/forward/:linkID")
    .get(linkValidator.validateFrowardLink, authorization.recordVisitIfLoggedInAndPass, linkController.forwardLink);

linkRouter
    .route("/get-forward/:linkID")
    .get(linkValidator.validateFrowardLink, authorization.recordVisitIfLoggedInAndPass, linkController.getforwardLink);

linkRouter
    .route("/getLink/:linkID")
    .get(linkValidator.validateFrowardLink, linkController.getLink);

linkRouter.route('public-visible').get(linkController.getPublicVisible);

module.exports = linkRouter;
