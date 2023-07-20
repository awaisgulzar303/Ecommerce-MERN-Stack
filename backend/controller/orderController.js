const Order = require("../models/orederModel");
const ErrorHandler = require("../utls/errorhandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");

//Create order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    createdAt: Date.now(),
    User: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
