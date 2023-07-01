const productSchema = require("../models/productModel");
const ErrorHandler = require("../utls/errorhandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utls/Api_feaures");

//create product

exports.createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user.id;
  const product = await productSchema.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//read products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const productPerPage = 2;
  const productCount = await productSchema.countDocuments();
  console.log(productCount);

  const apiFeature = new ApiFeature(productSchema.find(), req.query).pagination(
    productPerPage
  );
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//update products
exports.updateProducts = catchAsyncError(async (req, res) => {
  let product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("no item exist with this id", 500));
  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
  });
});

//get product Details by id

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
