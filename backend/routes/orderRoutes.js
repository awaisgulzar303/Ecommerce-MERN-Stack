const express = require("express");
const {
  newOrder,
  getSingleOrderDetails,
  myOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controller/orderController");
const router = express.Router();
const { authorizeRole, isAuthenticatedUser } = require("../middleware/auth");

router.route("/newOrder").post(isAuthenticatedUser, newOrder);
router
  .route("/single/order/:id")
  .get(isAuthenticatedUser, getSingleOrderDetails);

router.route("/myOrder").get(isAuthenticatedUser, myOrders);

router
  .route("/myCurrentOrders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);

router
  .route("/update/Orderstatus/:id")
  .post(isAuthenticatedUser, authorizeRole("admin"), updateOrderStatus);
module.exports = router;
