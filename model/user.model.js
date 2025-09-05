const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
    },
    email: {
        type: String,
        required: true,
        email: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
        enum: ["publisher", "user", "admin"],
    },
    balance: {
        type: Number,
        default: 0,
    },
    total_link_visitors: {
        type: Number,
        default: 0,
        min: 0,
    },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
