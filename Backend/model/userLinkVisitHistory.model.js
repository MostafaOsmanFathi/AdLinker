const mongoose = require("mongoose");

const userLinkVisitHistorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        email: true,
    },
    visited_shorten_link_id: {
        type: String,
        required: true,
    }
});

const userLinkVisitHistoryModel = mongoose.model("userLinkVisitHistory", userLinkVisitHistorySchema);

module.exports = userLinkVisitHistoryModel;
