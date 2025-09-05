const express = require('express');
const dbConnection = require("./database/monogodbConnection.js");
const userRouter = require("./route/user.route.js");
const linkRouter = require("./route/link.route.js");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(linkRouter);


app.listen(3333, () => {
    console.log(`Server started at http://localhost:3333/`);
});