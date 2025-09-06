const express = require("express");
const linkValidator = require("../middleware/validators/linkValidators");
const linkController = require("../controller/link.controller");

const linkRouter = express.Router();

linkRouter
    .route("/forward/:linkID")
    .get(linkValidator.validateFrowardLink, linkController.forwardLink);
linkRouter
    .route("/getLink/:linkID")
    .get(linkValidator.validateFrowardLink, linkController.getLink);

module.exports = linkRouter;
