const express = require("express");
const authorization = require("../middleware/authorization");
const linkValidator = require("../middleware/validators/linkValidators");
const linkController = require("../controller/link.controller");

const linkRoute = express.Router();

linkRoute
    .route("/forward/:linkID")
    .get(linkValidator.validateFrowardLink, linkController.forwardLink);
linkRoute
    .route("/getLink/:linkID")
    .get(linkValidator.validateFrowardLink, linkController.getLink);

module.exports = linkRoute;
