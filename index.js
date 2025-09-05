const express = require('express');
const dbConnection = require("./data-acess/monogodbConnection.js");


const app = express();


app.listen(3333, () => {
    console.log(`Server started at http://localhost:3333/`);
});