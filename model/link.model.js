const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    original_link: {
        type: String,
        required: true,
    },
    shorten_link: {
        type: String,
        required: true,
        unique: true,
    },
    publisher_name: {
        type: String,
        required: true,
    },
    publisher_email: {
        type: String,
        required: true,
        email: true,
    },
    number_of_visitors: {
        type: Number,
        default: 0,
    },
});

const linkModel = mongoose.model("links", linkSchema);
module.exports = linkModel;
