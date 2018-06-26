require("dotenv").config();

const express = require("express");
const app = express();
const user = require("./controllers/userController");
const backlog = require("./controllers/backlogController");
const wishlist = require("./controllers/wishlistController");
const sequelize = require("./db");
const bodyParser = require("body-parser");

sequelize.sync();

app.use(bodyParser.json());
app.use(require("./middleware/headers"));

app.use("/blmanager/user", user);

app.use(require("./middleware/validation"));

app.use("/blmanager/backlog", backlog);
app.use("/blmanager/wishlist", wishlist);

app.listen(3000, () => {
    console.log("Server is active.  Listening on 3000")
});