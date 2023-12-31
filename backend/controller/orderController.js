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

//get single order
exports.getSingleOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "User",
    "name email"
  );

  if (!order) {
    return new ErrorHandler("Order not Found", 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});
//get single order details by id
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ User: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});

//get all orders --Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  totalAmount = 0;
  orders.forEach((order) => (totalAmount = totalAmount + order.itemsPrice));
  res.status(200).json({
    success: true,

    totalAmount,
  });
});

//update status of an order
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("order with this ID not found", 404));
  }
  if (order.status === "Deliverd") {
    return next(
      new ErrorHandler("You have already deliverd this product", 404)
    );
  }
  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  updateStock(order.orderItems.product, order.orderItems.quantity, next, res);
});

// update Stock
async function updateStock(id, quantity, next, res) {
  let product = await Product.findById(id);

  if (product.stock < quantity) {
    return next(new ErrorHandler("out of stock", 400));
  }
  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
}

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("order with this ID not found", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
