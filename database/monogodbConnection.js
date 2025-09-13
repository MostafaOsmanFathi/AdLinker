const mongoDB = require("mongoose");

const connection = mongoDB
    .connect(process.env.DB_URL)
    .then(() => console.log("MongoDB On BackendProject Connected successfully"))
    .catch((err) => console.error(err));

module.exports = mongoDB;
