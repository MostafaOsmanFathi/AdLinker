const mongoDB = require('mongoose')


const connection = mongoDB
    .connect("mongodb://localhost:27017/BackendProject")
    .then(() => console.log("MongoDB On BackendProject Connected successfully"))
    .catch(err => console.error(err));


module.exports = mongoDB;