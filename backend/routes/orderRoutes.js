const express = require("express");
const { newOrder } = require("../controller/orderController");
const router = express.Router();
const { authorizeRole, isAuthenticatedUser } = require("../middleware/auth");

router.route("/newOrder").post(isAuthenticatedUser, newOrder);

module.exports = router;
