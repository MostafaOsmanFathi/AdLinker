require('dotenv').config();
const express = require("express");
const dbConnection = require("./database/monogodbConnection");
const userRouter = require("./route/account.router.js");
const linkRouter = require("./route/link.router.js");
const adminRouter = require("./route/admin.router");
const publisherRouter = require("./route/publisher.router");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/account", userRouter);
app.use("/admin", adminRouter);
app.use("/link", linkRouter);
app.use("/publisher", publisherRouter);

app.use((req, res, next) => {
    res.send("<h1> UnSupported Route </h1>");
});
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server started at http://${process.env.HOST_NAME}:${process.env.PORT}/`);
});
