const mongoose = require("mongoose");

const linkSchema = new mongoose.Model(
    {
        original_link: {
            type: String,
            required: true,
        },
        shorten_link: {
            type: String,
            required: true,
        },
        publisher_name: {
            type: String,
            required: true,
        },
        number_of_visitors: {
            type: Number,
            default: 0,
        }
    }
)

const linkModel = mongoose.model("LinkModel", linkSchema);
module.exports = linkModel;

