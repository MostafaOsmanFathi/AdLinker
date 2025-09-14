const mongoDB = require("mongoose");

const connection = mongoDB
    .connect(process.env.DB_URL)
    .then(() => console.log(`MongoDB Connected successfully on DB_URL: ${process.env.DB_URL}`))
    .catch((err) => console.error(err));

module.exports = mongoDB;
