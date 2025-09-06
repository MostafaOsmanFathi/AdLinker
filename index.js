const express = require("express");
const dbConnection = require("./database/monogodbConnection");
const userRouter = require("./route/account.router.js");
const linkRouter = require("./route/link.router.js");
const adminRouter = require("./route/admin.router");
const publisherRouter = require("./route/publisher.router");
const app = express();

app.use(express.json());

app.use("/account", userRouter);
app.use("/admin", adminRouter);
app.use("/link", linkRouter);
app.use("/publisher", publisherRouter);

app.listen(3333, () => {
    console.log(`Server started at http://localhost:3333/`);
});
