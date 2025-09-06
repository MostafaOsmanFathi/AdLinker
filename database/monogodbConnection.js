const mongoDB = require("mongoose");
const {DB_URL} = require("../config/env")

const connection = mongoDB
    .connect(DB_URL)
    .then(() => console.log("MongoDB On BackendProject Connected successfully"))
    .catch((err) => console.error(err));

module.exports = mongoDB;
