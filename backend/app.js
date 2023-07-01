const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
//Route Imports
const product = require("./routes/productRoute");
const userRegsiter = require("./routes/userRoutes");
app.use("/api/v1", product);
app.use("/api/v1", userRegsiter);

//middleWare for errors
app.use(errorMiddleWare);

module.exports = app;
