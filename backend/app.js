const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
//Route Imports
const product = require("./routes/productRoute");
const userRegsiter = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
app.use("/api/v1", product);
app.use("/api/v1", userRegsiter);
app.use("/api/v1", order);

//middleWare for errors
app.use(errorMiddleWare);

module.exports = app;
